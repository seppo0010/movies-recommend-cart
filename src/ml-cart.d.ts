declare module 'ml-cart' {
  export interface TreeBranch {
    splitValue: number
    splitColumn: number
    left: TreeNode
    right: TreeNode
  }
  export interface TreeLeaf {
    distribution: number
  }
  export type TreeNode = TreeBranch | TreeLeaf
  export class DecisionTreeRegression {
    constructor(options?: {
      gainFunction?: string,
      splitFunction?: string,
      maxDepth?: number,
      minNumSamples?: number,
    })
    train(data: number[][], labels: number[])
    toJSON(): { root: TreeNode }
    predict(data: number[][]): number[]
  }
}
