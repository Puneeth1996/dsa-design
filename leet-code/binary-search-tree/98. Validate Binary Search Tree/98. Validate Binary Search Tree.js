// class Node{
//     constructor(value){
//         this.value = value;
//         this.left = null;
//         this.right = null;
//     }
// }

// class BinaryTree{
//     constructor(){
//         this.root = null;
//     }
//     insert(array){
//         if(array.length===0) return;
//         let i=0;
//         //if root is null
//         if(!this.root){
//             if(array[0]===null)return;
//             else{
//                 let node = new Node(array[0]);
//                 this.root = node;
//                 i++;
//                 if(i===array.length) return this;
//             }
//         }
//         //insert elements
//         const queue = [this.root];
//         while(queue.length){
//             let current = queue.shift();
//             //left
//             if(!current.left){
//                 if(array[i]!==null){
//                     let node = new Node(array[i]);
//                     current.left = node;
//                 }
//                 i++;
//                 if(i===array.length) return this;
//             }
//             if(current.left) queue.push(current.left);
//             //right
//             if(!current.right){
//                 if(array[i]!==null){
//                     let node = new Node(array[i]);
//                     current.right = node;
//                 }
//                 i++;
//                 if(i===array.length) return this;
//             }
//             if(current.right) queue.push(current.right);
//         }
//     }
// }

// //function to check whether tree is a valid BST
// const checkIfValidBST = function(root){
//     return helper(root,-Infinity,Infinity);
// }

// const helper = function(node,min,max){
//     //base case
//     if(node===null) return true;

//     let value = node.value;
//     if(value<=min || value >=max) return false; //min<value<max
//     //node's left subtree and right subtress is a valid BST
//     const isLeftBST = helper(node.left,min,value);
//     const isRighBST = helper(node.right,value,max);
//     return isLeftBST&&isRighBST;
// }

// const tree = new BinaryTree();
// tree.insert([10,5,20,3,7,15,30,null,4,null,null,null,17,null,
//              null,null,null,null,18]);

// checkIfValidBST(tree.root);

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

var isValidBST = (root) => {
	if (!root) {
		return true
	}
	let result = true
	let prevNode = null

	const find = (node) => {
		if (node.left) {
			find(node.left)
		}

		if (prevNode !== null && prevNode >= node.val) {
			result = false
			return
		}

		prevNode = node.val

		if (node.right) {
			find(node.right)
		}
	}

	find(root)

	return result
}

// function isValidBST(root, min = null, max = null) {
// 	if (!root) {
// 		return true
// 	}

// 	if (
// 		(min !== null && root.value <= min) ||
// 		(max !== null && root.value >= max)
// 	) {
// 		return false
// 	}

// 	return (
// 		isValidBST(root.left, min, root.value) &&
// 		isValidBST(root.right, root.value, max)
// 	)
// }
