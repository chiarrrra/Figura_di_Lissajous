/**
 * LABORATORIO INTERATTIVO: ONDE SONORE, LISSAJOUS E OSCILLOSCOPIO
 * Codice JavaScript robusto e performante
 * Suddiviso in tre sezioni logiche
 */

// ============================================================================
// GLOBAL STATE
// ============================================================================
const LabState = {
	animationRunning: true,
	timeElapsed: 0,
	dpr: window.devicePixelRatio || 1,
};

// ============================================================================
// SEZIONE LAB_1: STRUMENTO ONDE SONORE
// ============================================================================

function inizializzaLaboratorioOndeFase() {
	const canvas = document.getElementById('labFaseWaveCanvas');
	const ctx = canvas.getContext('2d');

	// Get all input elements
	const freqInput = document.getElementById('labFaseFrequency');
	const ampInput = document.getElementById('labFaseAmplitude');
	const phaseInput = document.getElementById('labFasePhase');

	// Get all display elements
	const freqDisplay = document.getElementById('labFaseFrequencyVal');
	const ampDisplay = document.getElementById('labFaseAmplitudeVal');
	const phaseDisplay = document.getElementById('labFasePhaseVal');

	// Update display values on input
	const updateLab1Displays = () => {
		freqDisplay.textContent = parseFloat(freqInput.value).toFixed(1);
		ampDisplay.textContent = parseInt(ampInput.value, 10);
		phaseDisplay.textContent = parseInt(phaseInput.value, 10) + '°';
	};

	[freqInput, ampInput, phaseInput].forEach(el => {
		el.addEventListener('input', updateLab1Displays);
	});

	updateLab1Displays();

	// Draw wave function
	function drawWave() {
		const width = canvas.width;
		const height = canvas.height;
		const centerY = height / 2;

		ctx.clearRect(0, 0, width, height);

		// Draw background
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, width, height);

		// Draw center line
		ctx.strokeStyle = '#003e28';
		ctx.lineWidth = 1;
		ctx.setLineDash([5, 5]);
		ctx.beginPath();
		ctx.moveTo(0, centerY);
		ctx.lineTo(width, centerY);
		ctx.stroke();
		ctx.setLineDash([]);

		// Get parameters
		const frequency = parseFloat(freqInput.value);
		const amplitude = parseFloat(ampInput.value);
		const phaseRad = (parseFloat(phaseInput.value) * Math.PI) / 180;

		// Draw grid lines at cycle boundaries
		ctx.strokeStyle = '#1a4d3d';
		ctx.lineWidth = 0.5;
		ctx.setLineDash([3, 3]);
		for (let i = 1; i < frequency; i++) {
			const x = (i / frequency) * width;
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
			ctx.stroke();
		}
		ctx.setLineDash([]);

		// Draw waveform
		ctx.strokeStyle = '#00f0a0';
		ctx.lineWidth = 2.5;
		ctx.beginPath();

		for (let x = 0; x < width; x++) {
			// Normalize x to [0, 1]
			const t = x / width;
			// Calculate y using: y(t) = A * sin(2πft + ϕ)
			const y =
				centerY +
				amplitude * Math.sin(2 * Math.PI * frequency * t + phaseRad);

			if (x === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		}
		ctx.stroke();

		// Draw boundary box
		ctx.strokeStyle = '#005337';
		ctx.lineWidth = 1;
		ctx.strokeRect(0, 0, width, height);
	}

	// Initial draw
	drawWave();

	// Return draw function for main loop
	return drawWave;
}

// ============================================================================
// SEZIONE LAB_2: STRUMENTO FIGURE DI LISSAJOUS
// ============================================================================

function inizializzaLaboratorioLissajous() {
	const canvas = document.getElementById('labLisCanvas');
	const ctx = canvas.getContext('2d');

	// Get all input elements
	const freqXInput = document.getElementById('labLisFreqX');
	const freqYInput = document.getElementById('labLisFreqY');
	const phaseInput = document.getElementById('labLisPhase');
	const ampInput = document.getElementById('labLisAmplitude');

	// Get all display elements
	const freqXDisplay = document.getElementById('labLisFreqXVal');
	const freqYDisplay = document.getElementById('labLisFreqYVal');
	const phaseDisplay = document.getElementById('labLisPhaseVal');
	const ampDisplay = document.getElementById('labLisAmplitudeVal');

	// Update display values on input
	const updateLab2Displays = () => {
		freqXDisplay.textContent = parseInt(freqXInput.value, 10);
		freqYDisplay.textContent = parseInt(freqYInput.value, 10);
		phaseDisplay.textContent = parseInt(phaseInput.value, 10) + '°';
		ampDisplay.textContent = parseInt(ampInput.value, 10);
	};

	[freqXInput, freqYInput, phaseInput, ampInput].forEach(el => {
		el.addEventListener('input', updateLab2Displays);
	});

	updateLab2Displays();

	// Draw Lissajous curve
	function drawLissajous() {
		const width = canvas.width;
		const height = canvas.height;
		const centerX = width / 2;
		const centerY = height / 2;

		ctx.clearRect(0, 0, width, height);

		// Draw background
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, width, height);

		// Draw crosshair (center lines)
		ctx.strokeStyle = '#003e28';
		ctx.lineWidth = 1;
		ctx.setLineDash([5, 5]);
		ctx.beginPath();
		ctx.moveTo(centerX, 0);
		ctx.lineTo(centerX, height);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(0, centerY);
		ctx.lineTo(width, centerY);
		ctx.stroke();
		ctx.setLineDash([]);

		// Get parameters
		const freqX = parseFloat(freqXInput.value);
		const freqY = parseFloat(freqYInput.value);
		const phaseRad = (parseFloat(phaseInput.value) * Math.PI) / 180;
		const amplitude = parseFloat(ampInput.value);

		// Draw Lissajous curve
		ctx.strokeStyle = '#a7ffaf';
		ctx.lineWidth = 2;
		ctx.beginPath();

		const steps = 1000;
		for (let i = 0; i <= steps; i++) {
			// Parameter t from 0 to 2π
			const t = (i / steps) * Math.PI * 2;

			// Lissajous equations:
			// x = A * sin(freqX * t)
			// y = A * sin(freqY * t + phase)
			const x =
				centerX + amplitude * Math.sin(freqX * t);
			const y =
				centerY + amplitude * Math.sin(freqY * t + phaseRad);

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
		}
		ctx.stroke();

		// Draw boundary box
		ctx.strokeStyle = '#005337';
		ctx.lineWidth = 1;
		ctx.strokeRect(0, 0, width, height);
	}

	// Initial draw
	drawLissajous();

	// Return draw function for main loop
	return drawLissajous;
}

// ============================================================================
// SEZIONE LAB_3: STRUMENTO OSCILLOSCOPIO (MODALITÀ X-Y)
// ============================================================================

function inizializzaLaboratorioOscilloscopio() {
	// Canvas elements
	const formaCanvas = document.getElementById('formaCanvasLab');
	const formaCtx = formaCanvas.getContext('2d');
	const sigXCanvas = document.getElementById('labSegnaleXCanvas');
	const sigXCtx = sigXCanvas.getContext('2d');
	const sigYCanvas = document.getElementById('labSegnaleYCanvas');
	const sigYCtx = sigYCanvas.getContext('2d');

	// Control elements
	const modalitySelect = document.getElementById(
		'labModalitaVisualizzazione'
	);
	const formaSelect = document.getElementById('labSelezionaForma');
	const pausePlayBtn = document.getElementById('labPausaPlayBtn');
	const cerchioBtn = document.getElementById('labVisualizzaCerchioBtn');
	const velocityInput = document.getElementById('labVelocitaTracciamento');
	const cartesianToggle = document.getElementById(
		'labTogglePianoCartesiano'
	);

	// Lissajous controls (visible by default)
	const lisFreqXInput = document.getElementById('labLissajousFreqX');
	const lisFreqYInput = document.getElementById('labLissajousFreqY');
	const lisPhaseInput = document.getElementById('labLissajousPhase');

	// Display elements
	const lisFreqXDisplay = document.getElementById(
		'labLissajousFreqXVal'
	);
	const lisFreqYDisplay = document.getElementById(
		'labLissajousFreqYVal'
	);
	const lisPhaseDisplay = document.getElementById('labLissajousPhaseVal');
	const velocityDisplay = document.getElementById(
		'labVelocitaTracciamentoVal'
	);
	const vxDisplay = document.getElementById('labVxValIstantaneo');
	const vyDisplay = document.getElementById('labVyValIstantaneo');

	// Control visibility based on modality
	const controlliLissajous = document.getElementById(
		'labControlliLissajous'
	);
	const controlliComplesse = document.getElementById(
		'labControlliFormeComplesse'
	);

	const updateLab3Displays = () => {
		lisFreqXDisplay.textContent = parseInt(lisFreqXInput.value, 10);
		lisFreqYDisplay.textContent = parseInt(lisFreqYInput.value, 10);
		lisPhaseDisplay.textContent =
			parseInt(lisPhaseInput.value, 10) + '°';
		velocityDisplay.textContent = parseFloat(velocityInput.value).toFixed(
			1
		);
	};

	[lisFreqXInput, lisFreqYInput, lisPhaseInput, velocityInput].forEach(
		el => {
			el.addEventListener('input', updateLab3Displays);
		}
	);

	updateLab3Displays();

	// Modality switcher
	modalitySelect.addEventListener('change', e => {
		if (e.target.value === 'sinusoidali') {
			controlliLissajous.style.display = 'grid';
			controlliComplesse.style.display = 'none';
		} else {
			controlliLissajous.style.display = 'none';
			controlliComplesse.style.display = 'block';
		}
	});

	// Pause/Play button
	pausePlayBtn.addEventListener('click', () => {
		LabState.animationRunning = !LabState.animationRunning;
		pausePlayBtn.textContent = LabState.animationRunning
			? '⏸ Pausa'
			: '▶ Play';
	});

	// Circle preset button
	cerchioBtn.addEventListener('click', () => {
		lisFreqXInput.value = 1;
		lisFreqYInput.value = 1;
		lisPhaseInput.value = 90;
		updateLab3Displays();
	});

	// Calculate current XY position based on modality
	function getPositionXY() {
		const modality = modalitySelect.value;
		const t = LabState.timeElapsed;

		if (modality === 'sinusoidali') {
			// Lissajous mode
			const freqX = parseFloat(lisFreqXInput.value);
			const freqY = parseFloat(lisFreqYInput.value);
			const phaseRad =
				(parseFloat(lisPhaseInput.value) * Math.PI) / 180;
			const amplitude = 1; // normalized

			const x = Math.sin(freqX * t + Math.PI / 2); // phase X starts at 90
			const y = Math.sin(freqY * t + phaseRad + Math.PI / 2);

			return { x, y };
		} else {
			// Complex forms mode
			const forma = formaSelect.value;
			const t_norm = (t % (2 * Math.PI)) / (2 * Math.PI);

			switch (forma) {
				case 'quadrato': {
					// Trace a square
					const side = t_norm * 4;
					if (side < 1)
						return { x: -1 + 2 * side, y: -1 };
					if (side < 2)
						return { x: 1, y: -1 + 2 * (side - 1) };
					if (side < 3)
						return { x: 1 - 2 * (side - 2), y: 1 };
					return { x: -1, y: 1 - 2 * (side - 3) };
				}
				case 'triangolo': {
					// Trace a triangle
					if (t_norm < 1 / 3)
						return {
							x: -1 + 6 * t_norm,
							y: -1 + (6 * t_norm * Math.sqrt(3)) / 2,
						};
					if (t_norm < 2 / 3)
						return {
							x: 1 - 6 * (t_norm - 1 / 3),
							y: Math.sqrt(3) - 6 * (t_norm - 1 / 3) * Math.sqrt(3),
						};
					return {
						x: -1 + 6 * (t_norm - 2 / 3),
						y: -1,
					};
				}
				case 'stella': {
					// 5-pointed star
					const angle = t_norm * 2 * Math.PI;
					const r =
						Math.cos(5 * angle) > 0.5
							? 1
							: 0.4;
					return {
						x: r * Math.cos(angle),
						y: r * Math.sin(angle),
					};
				}
				case 'rampaX': {
					// Ramp along X axis
					return {
						x: -1 + 2 * t_norm,
						y: 0,
					};
				}
				case 'rampaY': {
					// Ramp along Y axis
					return {
						x: 0,
						y: -1 + 2 * t_norm,
					};
				}
				default:
					return { x: 0, y: 0 };
			}
		}
	}

	// Draw main XY trace
	function drawFormaCanvas() {
		const width = formaCanvas.width;
		const height = formaCanvas.height;
		const centerX = width / 2;
		const centerY = height / 2;
		const scale = Math.min(width, height) * 0.35; // 80% fill

		formaCtx.clearRect(0, 0, width, height);

		// Background
		formaCtx.fillStyle = '#000';
		formaCtx.fillRect(0, 0, width, height);

		// Draw Cartesian plane if enabled
		if (cartesianToggle.checked) {
			formaCtx.strokeStyle = '#003e28';
			formaCtx.lineWidth = 1;
			formaCtx.setLineDash([5, 5]);
			// X axis
			formaCtx.beginPath();
			formaCtx.moveTo(0, centerY);
			formaCtx.lineTo(width, centerY);
			formaCtx.stroke();
			// Y axis
			formaCtx.beginPath();
			formaCtx.moveTo(centerX, 0);
			formaCtx.lineTo(centerX, height);
			formaCtx.stroke();
			formaCtx.setLineDash([]);
		}

		// Trace curve
		formaCtx.strokeStyle = '#00ff00';
		formaCtx.lineWidth = 1.5;
		formaCtx.beginPath();

		const steps = 200;
		for (let i = 0; i <= steps; i++) {
			const tStep =
				(i / steps) * 4 * Math.PI * (LabState.animationRunning ? 1 : 0);
			const savedTime = LabState.timeElapsed;
			LabState.timeElapsed = tStep;
			const pos = getPositionXY();
			LabState.timeElapsed = savedTime;

			const x = centerX + pos.x * scale;
			const y = centerY - pos.y * scale; // invert Y for canvas coords

			if (i === 0) {
				formaCtx.moveTo(x, y);
			} else {
				formaCtx.lineTo(x, y);
			}
		}
		formaCtx.stroke();

		// Draw current point
		const pos = getPositionXY();
		const px = centerX + pos.x * scale;
		const py = centerY - pos.y * scale;

		formaCtx.fillStyle = '#ffff00';
		formaCtx.beginPath();
		formaCtx.arc(px, py, 5, 0, 2 * Math.PI);
		formaCtx.fill();

		// Border
		formaCtx.strokeStyle = '#005337';
		formaCtx.lineWidth = 1;
		formaCtx.strokeRect(0, 0, width, height);
	}

	// Draw X signal waveform
	function drawSignalXCanvas() {
		const width = sigXCanvas.width;
		const height = sigXCanvas.height;
		const centerY = height / 2;

		sigXCtx.clearRect(0, 0, width, height);

		// Background
		sigXCtx.fillStyle = '#000';
		sigXCtx.fillRect(0, 0, width, height);

		// Center line
		sigXCtx.strokeStyle = '#003e28';
		sigXCtx.lineWidth = 1;
		sigXCtx.setLineDash([3, 3]);
		sigXCtx.beginPath();
		sigXCtx.moveTo(0, centerY);
		sigXCtx.lineTo(width, centerY);
		sigXCtx.stroke();
		sigXCtx.setLineDash([]);

		// Draw waveform history
		sigXCtx.strokeStyle = '#ff6b6b';
		sigXCtx.lineWidth = 1.5;
		sigXCtx.beginPath();

		const history = 200;
		for (let i = 0; i < history; i++) {
			const tStep =
				(i / history) * 4 * Math.PI * (LabState.animationRunning ? 1 : 0);
			const savedTime = LabState.timeElapsed;
			LabState.timeElapsed = tStep;
			const pos = getPositionXY();
			LabState.timeElapsed = savedTime;

			const x = (i / history) * width;
			const y = centerY - pos.x * centerY;

			if (i === 0) {
				sigXCtx.moveTo(x, y);
			} else {
				sigXCtx.lineTo(x, y);
			}
		}
		sigXCtx.stroke();

		// Cursor (current time)
		const velocity = parseFloat(velocityInput.value);
		const cursorX =
			(velocity / 5) * width; // normalized to width

		sigXCtx.strokeStyle = '#ff0000';
		sigXCtx.lineWidth = 2;
		sigXCtx.beginPath();
		sigXCtx.moveTo(cursorX, 0);
		sigXCtx.lineTo(cursorX, height);
		sigXCtx.stroke();

		// Border
		sigXCtx.strokeStyle = '#005337';
		sigXCtx.lineWidth = 1;
		sigXCtx.strokeRect(0, 0, width, height);
	}

	// Draw Y signal waveform
	function drawSignalYCanvas() {
		const width = sigYCanvas.width;
		const height = sigYCanvas.height;
		const centerY = height / 2;

		sigYCtx.clearRect(0, 0, width, height);

		// Background
		sigYCtx.fillStyle = '#000';
		sigYCtx.fillRect(0, 0, width, height);

		// Center line
		sigYCtx.strokeStyle = '#003e28';
		sigYCtx.lineWidth = 1;
		sigYCtx.setLineDash([3, 3]);
		sigYCtx.beginPath();
		sigYCtx.moveTo(0, centerY);
		sigYCtx.lineTo(width, centerY);
		sigYCtx.stroke();
		sigYCtx.setLineDash([]);

		// Draw waveform history
		sigYCtx.strokeStyle = '#6bcf7f';
		sigYCtx.lineWidth = 1.5;
		sigYCtx.beginPath();

		const history = 200;
		for (let i = 0; i < history; i++) {
			const tStep =
				(i / history) * 4 * Math.PI * (LabState.animationRunning ? 1 : 0);
			const savedTime = LabState.timeElapsed;
			LabState.timeElapsed = tStep;
			const pos = getPositionXY();
			LabState.timeElapsed = savedTime;

			const x = (i / history) * width;
			const y = centerY - pos.y * centerY;

			if (i === 0) {
				sigYCtx.moveTo(x, y);
			} else {
				sigYCtx.lineTo(x, y);
			}
		}
		sigYCtx.stroke();

		// Cursor
		const velocity = parseFloat(velocityInput.value);
		const cursorX = (velocity / 5) * width;

		sigYCtx.strokeStyle = '#ff0000';
		sigYCtx.lineWidth = 2;
		sigYCtx.beginPath();
		sigYCtx.moveTo(cursorX, 0);
		sigYCtx.lineTo(cursorX, height);
		sigYCtx.stroke();

		// Border
		sigYCtx.strokeStyle = '#005337';
		sigYCtx.lineWidth = 1;
		sigYCtx.strokeRect(0, 0, width, height);
	}

	// Update instantaneous values
	function updateInstantaneousValues() {
		const pos = getPositionXY();
		vxDisplay.textContent = pos.x.toFixed(2);
		vyDisplay.textContent = pos.y.toFixed(2);
	}

	// Composite render function
	function renderOscilloscopio() {
		drawFormaCanvas();
		drawSignalXCanvas();
		drawSignalYCanvas();
		updateInstantaneousValues();
	}

	return renderOscilloscopio;
}

// ============================================================================
// MAIN ANIMATION LOOP
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
	// Initialize all three labs
	const drawWave = inizializzaLaboratorioOndeFase();
	const drawLissajous = inizializzaLaboratorioLissajous();
	const renderOscilloscopio = inizializzaLaboratorioOscilloscopio();

	// Velocity input for Lab 3
	const velocityInput = document.getElementById('labVelocitaTracciamento');

	// Main animation frame loop
	function mainLoop() {
		// Update Lab 1 (static, no animation)
		drawWave();

		// Update Lab 2 (static, no animation)
		drawLissajous();

		// Update Lab 3 (animated)
		if (LabState.animationRunning) {
			const velocity = parseFloat(velocityInput.value);
			LabState.timeElapsed += velocity * 0.02;
		}
		renderOscilloscopio();

		requestAnimationFrame(mainLoop);
	}

	// Start the main loop
	mainLoop();

	// Handle window resize
	window.addEventListener('resize', () => {
		// Trigger redraws on resize
		drawWave();
		drawLissajous();
		renderOscilloscopio();
	});

	// Hide p5 canvas if present
	setTimeout(() => {
		const p5Canvas = document.querySelector('canvas.p5Canvas');
		if (p5Canvas) {
			p5Canvas.style.position = 'fixed';
			p5Canvas.style.top = '0';
			p5Canvas.style.left = '0';
			p5Canvas.style.zIndex = '-1';
			p5Canvas.style.pointerEvents = 'none';
			p5Canvas.style.opacity = '0.1';
		}
	}, 500);
});
