declare module 'ml-cart' {
  export interface TreeBranch {
    left: TreeNode
    right: TreeNode
  }
  export interface TreeLeaf {
    distribution: {
      data: [number, number],
    }
  }
  export type TreeNode = TreeBranch | TreeLeaf
  export class DecisionTreeClassifier {
    constructor(options?: {
      gainFunction?: string,
      splitFunction?: string,
      maxDepth?: number,
      minNumSamples?: number,
    })
    train(data: number[][], labels: number[])
    toJSON(): { root: TreeNode }
  }
}
