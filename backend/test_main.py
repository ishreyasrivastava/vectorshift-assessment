import pytest
from fastapi.testclient import TestClient
from main import app, is_dag, Node, Edge

client = TestClient(app)


# --- Unit tests for is_dag ---

def test_empty_graph_is_dag():
    assert is_dag([], []) is True


def test_single_node_is_dag():
    nodes = [Node(id="a", type="test")]
    assert is_dag(nodes, []) is True


def test_linear_chain_is_dag():
    nodes = [Node(id="a", type="t"), Node(id="b", type="t"), Node(id="c", type="t")]
    edges = [Edge(source="a", target="b"), Edge(source="b", target="c")]
    assert is_dag(nodes, edges) is True


def test_simple_cycle_is_not_dag():
    nodes = [Node(id="a", type="t"), Node(id="b", type="t")]
    edges = [Edge(source="a", target="b"), Edge(source="b", target="a")]
    assert is_dag(nodes, edges) is False


def test_triangle_cycle_is_not_dag():
    nodes = [Node(id="a", type="t"), Node(id="b", type="t"), Node(id="c", type="t")]
    edges = [
        Edge(source="a", target="b"),
        Edge(source="b", target="c"),
        Edge(source="c", target="a"),
    ]
    assert is_dag(nodes, edges) is False


def test_diamond_dag():
    nodes = [
        Node(id="a", type="t"), Node(id="b", type="t"),
        Node(id="c", type="t"), Node(id="d", type="t"),
    ]
    edges = [
        Edge(source="a", target="b"), Edge(source="a", target="c"),
        Edge(source="b", target="d"), Edge(source="c", target="d"),
    ]
    assert is_dag(nodes, edges) is True


def test_disconnected_nodes_is_dag():
    nodes = [Node(id="a", type="t"), Node(id="b", type="t"), Node(id="c", type="t")]
    edges = []
    assert is_dag(nodes, edges) is True


# --- API endpoint tests ---

def test_parse_pipeline_simple():
    payload = {
        "nodes": [
            {"id": "input-1", "type": "customInput"},
            {"id": "llm-1", "type": "llm"},
            {"id": "output-1", "type": "customOutput"},
        ],
        "edges": [
            {"source": "input-1", "target": "llm-1"},
            {"source": "llm-1", "target": "output-1"},
        ],
    }
    response = client.post("/pipelines/parse", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["num_nodes"] == 3
    assert data["num_edges"] == 2
    assert data["is_dag"] is True


def test_parse_pipeline_with_cycle():
    payload = {
        "nodes": [
            {"id": "a", "type": "t"},
            {"id": "b", "type": "t"},
        ],
        "edges": [
            {"source": "a", "target": "b"},
            {"source": "b", "target": "a"},
        ],
    }
    response = client.post("/pipelines/parse", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["is_dag"] is False
