const widthInput = document.querySelector('input[name="width"]')
const heightInput = document.querySelector('input[name="height"]')
const canvas = document.querySelector('.canvas')
const colors = document.querySelector('.colors')
const resetButton = document.getElementById('reset')
let activeColor = document.querySelector('.colors .active')

resetButton.addEventListener('click', reset)

colors.addEventListener('click', (e) => {
	const color = e.target.closest('.colors div')
	if (!color) return
	activeColor.classList.remove('active')
	activeColor = color
	activeColor.classList.add('active')
})

canvas.addEventListener('mousedown', (e) => {
	drawPixel(e)
	canvas.addEventListener('mousemove', drawPixel)
})

canvas.addEventListener('mouseup', (e) => {
	canvas.removeEventListener('mousemove', drawPixel)
})

reset()

function createPixel(w) {
	const pixel = document.createElement('div')
	pixel.className = 'aspect-square border'
	pixel.style.width = `${w}%`
	return pixel
}

function reset() {
	canvas.innerHTML = ''
	const w = widthInput.value
	const h = heightInput.value
	const n = w * h
	for (let i = 0; i < n; i++) {
		canvas.appendChild(createPixel(100 / w))
	}
}

function drawPixel(e) {
	const pixel = e.target.closest('.canvas div')
	if (!pixel) return
	const style = getComputedStyle(activeColor)
	pixel.style.backgroundColor = style.backgroundColor
	!activeColor.classList.contains('bg-transparent')
		? pixel.classList.remove('border')
		: pixel.classList.add('border')
}
