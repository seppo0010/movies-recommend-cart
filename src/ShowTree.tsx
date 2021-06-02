import React from 'react'
import Graph from "react-graph-vis";
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { TreeNode, TreeBranch, TreeLeaf } from 'ml-cart'
const { uuid } = require('uuidv4');

function format(n: number) {
    return Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}
export default function ShowTree() {
  const moviePredictor = useSelector((state: RootState) => state.moviePredictor)
  let id = 0
  const graph: {
    nodes: {id: number, label: string}[],
    edges: {from: number, to: number, label: string}[],
  } = {
    nodes: [],
    edges: [],
  };
  const addBranchToGraph = (node: TreeBranch) => {
    const graphNode = {id: ++id, label: `${moviePredictor.columns[node.splitColumn]}`}
    graph.nodes.push(graphNode)
    const left = addNodeToGraph(node.left)
    const right = addNodeToGraph(node.right)
    const splitValue = format(node.splitValue)
    graph.edges.push({from: graphNode.id, to: left.id, label: `< ${splitValue}`})
    graph.edges.push({from: graphNode.id, to: right.id, label: `>= ${splitValue}`})
    return graphNode
  }
  const addLeafToGraph = (node: TreeLeaf) => {
    const graphNode = {id: ++id, label: `${format(node.distribution)}`}
    graph.nodes.push(graphNode)
    return graphNode
  }
  const addNodeToGraph = (node: TreeNode) => {
    if ((node as TreeBranch).left) {
      return addBranchToGraph(node as TreeBranch)
    } else {
      return addLeafToGraph(node as TreeLeaf)
    }
  }
  addNodeToGraph(moviePredictor.tree)

  const options = {
    interaction: {
      dragNodes: false,
    },
    layout: {
      hierarchical: {
        enabled: true,
        direction: 'UD',
        sortMethod: 'directed',
      }
    },
    edges: {
      color: "#000000"
    },
    height: "500px",
    physics: { enabled: false },
  };
  return (
    <Graph
      key={uuid()}
      graph={graph}
      options={options}
    />
  )
}
