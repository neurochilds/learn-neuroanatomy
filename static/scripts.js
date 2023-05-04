function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function changeImage() {
    const imageSelect = document.getElementById('image-select');
    const selectedImage = imageSelect.value;
    const brainImage = document.getElementById('brain-image');

    brainImage.src = images[selectedImage].src;
    brainAreas = images[selectedImage].areas;
    shuffleArray(brainAreas);
    resetQuiz();
    resetHints();
}

function setArrowAndLabelSize() {
    const brainImage = document.getElementById('brain-image');
    const arrows = document.querySelectorAll('.arrow');
    const labels = document.querySelectorAll('.label');
    
    const arrowWidth = brainImage.clientWidth * 0.12; // Set the arrow width as a percentage of the brain image width
    arrows.forEach((arrow) => {
        arrow.style.width = `${arrowWidth}px`;
    });

    const fontSize = brainImage.clientWidth * 0.025; // Set the font size as a percentage of the brain image width
    labels.forEach((label) => {
        label.style.fontSize = `${fontSize}px`;
    });
}

function createArrowAndLabel(brainArea) {
    const brainContainer = document.getElementById('brain-container');

    // Create arrow
    const arrow = document.createElement('img');
    arrow.src = '/images/arrow.png';
    arrow.style.left = brainArea.arrowPosition.x;
    arrow.style.top = brainArea.arrowPosition.y;
    arrow.style.transform = `rotate(${brainArea.arrowRotation}deg)`;
    arrow.classList.add('arrow');
    arrow.id = `arrow-${brainArea.name}`;
    brainContainer.appendChild(arrow);

    // Create label
    const label = document.createElement('div');
    label.textContent = brainArea.name;
    label.style.left = brainArea.labelPosition.x;
    label.style.top = brainArea.labelPosition.y;
    label.classList.add('label');
    label.id = `label-${brainArea.name}`;
    brainContainer.appendChild(label);

    // Set the arrow size based on the brain image width
    setArrowAndLabelSize();
}

function makeBrainAreasList() {
    const brainAreasListContainer = document.getElementById('brain-areas-list-container');
    
    // Remove existing list if there is any
    const existingList = document.getElementById('brain-areas-list');
    if (existingList) {
        brainAreasListContainer.removeChild(existingList);
    }

    const brainAreasList = document.createElement('ul');
    brainAreasList.id = 'brain-areas-list';

    const shuffledBrainAreas = [...brainAreas];
    shuffleArray(shuffledBrainAreas);

    shuffledBrainAreas.forEach((brainArea) => {
        const brainAreaItem = document.createElement('li');
        brainAreaItem.textContent = brainArea.name;
        brainAreasList.appendChild(brainAreaItem);
    });

    brainAreasListContainer.appendChild(brainAreasList);
}

function submitAnswer() {
    const input = document.getElementById('brain-area-input');
    const userInput = input.value.trim().toLowerCase();
    const correctAnswer = brainAreas[currentIndex].name.toLowerCase();

    if (userInput === correctAnswer) {
        const label = document.getElementById(`label-${brainAreas[currentIndex].name}`);
        label.style.display = 'block';

        currentIndex++;
        if (currentIndex < brainAreas.length) {
            showModal('Correct!', 'green');
            showNextArrow();
        } else {
            showModal('Congratulations! You have completed the exercise.', 'green', 6000);
        }
    } else {
        showModal('Incorrect. Try again.', 'red');
    }

    input.value = '';
}

function showNextArrow() {
    const arrow = document.getElementById(`arrow-${brainAreas[currentIndex].name}`);
    arrow.style.display = 'block';
}

function positionModal() {
    const modal = document.getElementById('modal');
    const resetButton = document.getElementById('reset-button'); 
    const buttonRect = resetButton.getBoundingClientRect();

    modal.style.left = `${buttonRect.right + 10}px`;
    modal.style.top = `${buttonRect.top - 7}px`;
}

function closeModal() {
    const modalText = document.getElementById('modal-text');
    modalText.innerHTML = '<br>';
}

function showModal(message, color, duration=1500) {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');

    positionModal();
    modalText.textContent = message;
    modal.style.display = 'block';
    modal.style.color = color;

    setTimeout(() => {
        closeModal();
    }, duration);
}

function resetQuiz() {
    // Remove existing arrows and labels
    const brainContainer = document.getElementById('brain-container');
    const arrows = document.querySelectorAll('.arrow');
    const labels = document.querySelectorAll('.label');

    arrows.forEach((arrow) => {
        brainContainer.removeChild(arrow);
    });

    labels.forEach((label) => {
        brainContainer.removeChild(label);
    });

    // Create new arrows and labels based on the selected image
    shuffleArray(brainAreas);
    brainAreas.forEach((brainArea) => {
        createArrowAndLabel(brainArea);
    });

    currentIndex = 0;
    showNextArrow();
    const input = document.getElementById('brain-area-input');
    input.value = '';

    // Display the brain areas list
    resetHints()
    makeBrainAreasList();
}

function toggleHints() {
    const hintCheckbox = document.getElementById('hint-checkbox');
    const brainAreasList = document.getElementById('brain-areas-list');
    
    if (hintCheckbox.checked) {
        brainAreasList.style.display = 'block';
    } else {
        brainAreasList.style.display = 'none';
    }
}

function resetHints() {
    const hintCheckbox = document.getElementById('hint-checkbox'); // Reset checkbox
    hintCheckbox.checked = false; 
}

const images = {
    'mri': {
        src: '/images/mri.png',
        areas: [
            { name: 'Corpus Callosum', arrowPosition: { x: '26%', y: '26%' }, arrowRotation: 45, labelPosition: { x: '17%', y: '24%' } },
            { name: 'Pons', arrowPosition: { x: '41%', y: '58%' }, arrowRotation: 0, labelPosition: { x: '33.5%', y: '62.8%' } },
            { name: 'Medulla', arrowPosition: { x: '50%', y: '67%' }, arrowRotation: 0, labelPosition: { x: '39.5%', y: '71.8%' } },
            { name: 'Midbrain', arrowPosition: { x: '56%', y: '43%' }, arrowRotation: 160, labelPosition: { x: '69%', y: '46%' } },
            { name: 'Cerebellum', arrowPosition: { x: '72%', y: '50%' }, arrowRotation: 180, labelPosition: { x: '85%', y: '55.8%' } },
            { name: 'Thalamus', arrowPosition: { x: '47%', y: '31%' }, arrowRotation: 120, labelPosition: { x: '51%', y: '27.5%' } },
            { name: 'Hypothalamus', arrowPosition: { x: '33%', y: '46%' }, arrowRotation: 0, labelPosition: { x: '14%', y: '51%' } },
            { name: 'Spinal Cord', arrowPosition: { x: '64%', y: '90%' }, arrowRotation: 180, labelPosition: { x: '77%', y: '96%' } },
        ],
    },
    'cartoon-sagittal': {
        src: '/images/cartoon-sagittal.png',
        areas: [
            { name: 'Corpus Callosum', arrowPosition: { x: '26%', y: '26%' }, arrowRotation: 45, labelPosition: { x: '17%', y: '24%' } },
            { name: 'Pons', arrowPosition: { x: '37%', y: '61%' }, arrowRotation: 340, labelPosition: { x: '30%', y: '67%' } },
            { name: 'Medulla', arrowPosition: { x: '42%', y: '69%' }, arrowRotation: 0, labelPosition: { x: '31.5%', y: '72.8%' } },
            { name: 'Tectum', arrowPosition: { x: '55%', y: '45%' }, arrowRotation: 160, labelPosition: { x: '68%', y: '47%' } },
            { name: 'Tegmentum', arrowPosition: { x: '39%', y: '52%' }, arrowRotation: 340, labelPosition: { x: '24%', y: '58%' } },
            { name: 'Cerebellum', arrowPosition: { x: '73%', y: '53%' }, arrowRotation: 180, labelPosition: { x: '86%', y: '57.8%' } },
            { name: 'Thalamus', arrowPosition: { x: '49%', y: '35%' }, arrowRotation: 120, labelPosition: { x: '53%', y: '31.5%' } },
            { name: 'Hypothalamus', arrowPosition: { x: '29%', y: '48%' }, arrowRotation: 0, labelPosition: { x: '11%', y: '52%' } },
            { name: 'Spinal Cord', arrowPosition: { x: '61%', y: '81%' }, arrowRotation: 180, labelPosition: { x: '74%', y: '85.6%' } },
        ],
    },
    'lobes': {
        src: '/images/lobes.png',
        areas: [
            { name: 'Frontal Lobe', arrowPosition: { x: '12%', y: '12%' }, arrowRotation: 45, labelPosition: { x: '6%', y: '9%' } },
            { name: 'Parietal Lobe', arrowPosition: { x: '66%', y: '9%' }, arrowRotation: 120, labelPosition: { x: '67.5%', y: '5.8%' } },
            { name: 'Temporal Lobe', arrowPosition: { x: '27%', y: '67%' }, arrowRotation: 315, labelPosition: { x: '20%', y: '80%' } },
            { name: 'Occipital Lobe', arrowPosition: { x: '83%', y: '30%' }, arrowRotation: 120, labelPosition: { x: '88%', y: '23%' } },
            { name: 'Cerebellum', arrowPosition: { x: '80%', y: '68%' }, arrowRotation: 220, labelPosition: { x: '84%', y: '81%' } },
            { name: 'Spinal Cord', arrowPosition: { x: '58%', y: '83%' }, arrowRotation: 0, labelPosition: { x: '43%', y: '88%' } },
            { name: 'Central Sulcus', arrowPosition: { x: '36.5%', y: '1.7%' }, arrowRotation: 45, labelPosition: { x: '20%', y: '0.5%' } },
            { name: 'Parieto-occipital Sulcus', arrowPosition: { x: '78.6%', y: '18%' }, arrowRotation: 120, labelPosition: { x: '78%', y: '11%' } },
            { name: 'Preoccipital Notch', arrowPosition: { x: '63.5%', y: '54%' }, arrowRotation: 270, labelPosition: { x: '58%', y: '68.8%' } },
            { name: 'Sylvian fissure', arrowPosition: { x: '17.5%', y: '60%' }, arrowRotation: 320, labelPosition: { x: '0.5%', y: '71%' } },
        ],
    },
    'cortex': {
        src: '/images/cortex.png',
        areas: [
            { name: 'Broca\'s Area', arrowPosition: { x: '68%', y: '47.5%' }, arrowRotation: 214, labelPosition: { x: '84%', y: '68%' } },
            { name: 'Prefrontal Cortex', arrowPosition: { x: '83.5%', y: '32.1%' }, arrowRotation: 140.5, labelPosition: { x: '79.5%', y: '30%' } },
            { name: 'Somatic Motor Association Area', arrowPosition: { x: '69.6%', y: '11.5%' }, arrowRotation: 137, labelPosition: { x: '61.5%', y: '9%' } },
            { name: 'Primary Motor Cortex', arrowPosition: { x: '54.1%', y: '3.6%' }, arrowRotation: 113, labelPosition: { x: '50%', y: '0%' } },
            { name: 'Primary Sensory Cortex', arrowPosition: { x: '40.4%', y: '3.3%' }, arrowRotation: 66, labelPosition: { x: '16%', y: '0%' } },
            { name: 'Somatic Sensory Association Area', arrowPosition: { x: '17.5%', y: '12.6%' }, arrowRotation: 403, labelPosition: { x: '0%', y: '10%' } },
            { name: 'Visual Association Area', arrowPosition: { x: '3%', y: '38.4%' }, arrowRotation: 40, labelPosition: { x: '0.5%', y: '36%' } },
            { name: 'Visual Cortex', arrowPosition: { x: '4.3%', y: '75.4%' }, arrowRotation: 314, labelPosition: { x: '0%', y: '91%' } },
            { name: 'Wernicke\'s Area', arrowPosition: { x: '29.9%', y: '56.2%' }, arrowRotation: 286, labelPosition: { x: '22%', y: '91%' } },
            { name: 'Auditory Cortex', arrowPosition: { x: '47.15%', y: '57%' }, arrowRotation: 253.8, labelPosition: { x: '49%', y: '91%' } },
            { name: 'Auditory Association Area', arrowPosition: { x: '60.4%', y: '59.5%' }, arrowRotation: 231, labelPosition: { x: '68%', y: '86%' } },
        ],
    },
    'midbrain': {
        src: '/images/midbrain.png',
        areas: [
            { name: 'Massa Intermedia', arrowPosition: { x: '39%', y: '16.8%' }, arrowRotation: 16, labelPosition: { x: '9%', y: '16.5%' } },
            { name: 'Third Ventricle', arrowPosition: { x: '38.6%', y: '25.3%' }, arrowRotation: 14, labelPosition: { x: '9%', y: '25%' } },
            { name: 'Lateral Geniculate Nucleus', arrowPosition: { x: '21.9%', y: '32.3%' }, arrowRotation: 0, labelPosition: { x: '0%', y: '34%' } },
            { name: 'Medial Geniculate Nucleus', arrowPosition: { x: '27.5%', y: '35.1%' }, arrowRotation: 343, labelPosition: { x: '0%', y: '44%' } },
            { name: 'Abducens Nerve', arrowPosition: { x: '29.8%', y: '43.5%' }, arrowRotation: 319, labelPosition: { x: '9%', y: '55%' } },
            { name: 'Cerebellar Peduncle', arrowPosition: { x: '26.2%', y: '56.5%' }, arrowRotation: 337.5, labelPosition: { x: '1.5%', y: '63.4%' } },
            { name: 'Fourth Ventricle', arrowPosition: { x: '34.3%', y: '58%' }, arrowRotation: 329.2, labelPosition: { x: '7.5%', y: '71%' } },
            { name: 'Thalamus', arrowPosition: { x: '60.6%', y: '10.4%' }, arrowRotation: 145, labelPosition: { x: '72%', y: '11%' } },
            { name: 'Pineal Body', arrowPosition: { x: '49.6%', y: '27.2%' }, arrowRotation: 145.3, labelPosition: { x: '73.5%', y: '18.5%' } },
            { name: 'Superior Colliculus', arrowPosition: { x: '54%', y: '32.6%' }, arrowRotation: 185, labelPosition: { x: '71%', y: '39%' } },
            { name: 'Inferior Colliculus', arrowPosition: { x: '53.2%', y: '38.1%' }, arrowRotation: 202, labelPosition: { x: '67%', y: '47%' } },
        ],
    },
    'basal-ganglia-mb': {
        src: '/images/basal-ganglia-mb.png',
        areas: [
            { name: 'Thalamus', arrowPosition: { x: '40.2%', y: '37.8%' }, arrowRotation: 168, labelPosition: { x: '63%', y: '40%' } },
            { name: 'Corpus Callosum', arrowPosition: { x: '32.8%', y: '25.1%' }, arrowRotation: 124, labelPosition: { x: '45.5%', y: '15%' } },
            { name: 'Subthalamic Nucleus', arrowPosition: { x: '39.5%', y: '48.6%' }, arrowRotation: 191, labelPosition: { x: '63%', y: '61.5%' } },
            { name: 'Caudate Nucleus', arrowPosition: { x: '39.2%', y: '27.4%' }, arrowRotation: 128, labelPosition: { x: '52%', y: '20%' } },
            { name: 'Putamen', arrowPosition: { x: '45%', y: '42%' }, arrowRotation: 174, labelPosition: { x: '63%', y: '48%' } },
            { name: 'Globus Pallidus', arrowPosition: { x: '43.4%', y: '46.5%' }, arrowRotation: 182, labelPosition: { x: '63%', y: '55%' } },
            { name: 'Mammillary Bodies', arrowPosition: { x: '29.7%', y: '66.1%' }, arrowRotation: 270, labelPosition: { x: '24.5%', y: '86%' } },
            { name: 'Substantia Nigra', arrowPosition: { x: '40%', y: '51.8%' }, arrowRotation: 201, labelPosition: { x: '62.5%', y: '69%' } },
            { name: 'Amygdala', arrowPosition: { x: '42.4%', y: '57.8%' }, arrowRotation: 208, labelPosition: { x: '62.5%', y: '77%' } },
        ],
    },
    'basal-ganglia-ac': {
        src: '/images/basal-ganglia-ac.png',
        areas: [
            { name: 'Longitudinal Fissure', arrowPosition: { x: '37.6%', y: '16.7%' }, arrowRotation: 174.5, labelPosition: { x: '64.5%', y: '20%' } },
            { name: 'Corpus Callosum', arrowPosition: { x: '38%', y: '28.7%' }, arrowRotation: 161, labelPosition: { x: '64.5%', y: '25%' } },
            { name: 'Lateral Ventricles', arrowPosition: { x: '35%', y: '33.7%' }, arrowRotation: 161.5, labelPosition: { x: '64.5%', y: '30%' } },
            { name: 'Caudate Nucleus', arrowPosition: { x: '44%', y: '34.1%' }, arrowRotation: 177, labelPosition: { x: '64.5%', y: '40.5%' } },
            { name: 'Putamen', arrowPosition: { x: '49.1%', y: '39.7%' }, arrowRotation: 180, labelPosition: { x: '64.5%', y: '47%' } },
            { name: 'Globus Pallidus', arrowPosition: { x: '45.3%', y: '43.5%' }, arrowRotation: 185, labelPosition: { x: '64.5%', y: '53%' } },
            { name: 'Anterior Commissure', arrowPosition: { x: '32.3%', y: '64.8%' }, arrowRotation: 270, labelPosition: { x: '25.5%', y: '84%' } },
        ],
    },
};

let brainAreas = images['mri']['areas'];
shuffleArray(brainAreas);
let currentIndex = 0;

window.addEventListener('resize', setArrowAndLabelSize);

document.getElementById('brain-area-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior (form submission, page reload, etc.)
        submitAnswer();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const imageSelect = document.getElementById('image-select');
    imageSelect.value = 'mri'; // Set the default value
    changeImage(); // Update the image based on the default value
    imageSelect.addEventListener('change', changeImage);
});

// Initialize the quiz
brainAreas.forEach((brainArea) => {
    createArrowAndLabel(brainArea);
});
showNextArrow();