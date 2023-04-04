interface Prioritized {
	priority: number
}

class PriorityQueue<T extends Prioritized> {
	pq: T[]

	constructor() {
		this.pq = new Array(1).fill('ROOT')
	}

	get size(): number {
		return this.pq.length - 1
	}

	get isEmpty(): boolean {
		return this.pq.length === 1
	}

	insert(item: T) {
		//insert item at bottom and swim it up to it's spot
		const bottom = this.pq.push(item) - 1
		this.swim(bottom)
	}

	deleteMax(): T | undefined {
		//delete max item at root, take bottom item and sink to it's spot
		const max = this.pq[1]
		
		this.exchange(1, this.size)
		this.pq.splice(this.size)
		this.sink(1)

		return max
	}

	sink (idx: number) {
		while (2 * idx <= this.size) {
			const firstChild = 2 * idx
			const secondChild = firstChild + 1

			let child
			if (firstChild <= this.size) {
				if (this.less(firstChild, secondChild)) {
					child = firstChild
				} else {
					child = secondChild
				}

				if (!this.less(idx, child)) break

				this.exchange(idx, child)
				idx = child
			} else {
				break
			}
		}
	}

	swim(idx: number) {
		while (idx > 1 && this.less(Math.floor(idx/2), idx)) {
			this.exchange(Math.floor(idx/2), idx)
			idx = Math.floor(idx/2)
		}
	}

	less(idx_a: number, idx_b: number) {
		return this.pq[idx_a]?.priority < this.pq[idx_b]?.priority
	}

	exchange(idx_a: number, idx_b: number) {
		const temp = this.pq[idx_a]
		this.pq[idx_a] = this.pq[idx_b]
		this.pq[idx_b] = temp
	}
}

export {
	PriorityQueue
}
