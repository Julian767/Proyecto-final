const express = require('express');
const Component = require('../models/Component');
const router = express.Router();

router.get('/:budget/:useCase', async (req, res) => {
    const { budget, useCase } = req.params;
    
    const recommendations = {
        CPU: await recommendCPU(budget, useCase),
        GPU: await recommendGPU(budget, useCase),
        //otros componentes
    };

    res.json(recommendations);
});

async function recommendCPU(budget, useCase) {
   
    return await Component.find({ 
        type: 'CPU',
        price: { $lte: budget * 0.3 } 
    }).sort({ price: -1 }).limit(3);
}
export const getRecommendations = async (budget, useCase) => {
    const response = await fetch(`${API_BASE_URL}/recommendations/${budget}/${useCase}`);
    return await response.json();
};

document.getElementById('recommend-btn').addEventListener('click', async () => {
    const budget = document.getElementById('budget').value;
    const useCase = document.getElementById('use-case').value;
    
    const recommendations = await getRecommendations(budget, useCase);
    displayRecommendations(recommendations);
});