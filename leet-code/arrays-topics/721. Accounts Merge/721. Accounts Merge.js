/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
class UnionFind {
	constructor(n) {
		this.parent = Array(n)
			.fill(null)
			.map((_, index) => index)
		this.rank = Array(n).fill(1)
	}

	find(x) {
		if (x !== this.parent[x]) {
			this.parent[x] = this.find(this.parent[x])
		}
		return this.parent[x]
	}

	union(n1, n2) {
		let p1 = this.find(n1)
		let p2 = this.find(n2)

		if (p1 === p2) return 0

		if (this.rank[p1] > this.rank[p2]) {
			this.parent[p2] = p1
		} else if (this.rank[p2] > this.rank[p1]) {
			this.parent[p1] = p2
		} else {
			this.parent[p2] = p1
			this.rank[p1] += 1
		}
		return 1
	}
}

var accountsMerge = function (accounts) {
	let uf = new UnionFind(accounts.length)
	let emailToAcc = {}

	for (let i = 0; i < accounts.length; i++) {
		for (let j = 1; j < accounts[i].length; j++) {
			let mail = accounts[i][j]
			if (mail in emailToAcc) {
				uf.union(i, emailToAcc[mail])
			} else {
				emailToAcc[mail] = i
			}
		}
	}

	let emailGroups = {}
	for (const [mail, index] of Object.entries(emailToAcc)) {
		let leader = uf.find(index)
		if (!(leader in emailGroups)) {
			emailGroups[leader] = []
		}
		emailGroups[leader].push(mail)
	}

	let res = []
	for (const [key, emails] of Object.entries(emailGroups)) {
		let name = accounts[key][0]
		let sortedMails = emails.sort()
		res.push([name, ...sortedMails])
	}

	return res
}
