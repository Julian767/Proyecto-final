const Build = require('../models/Build');
const Component = require('../models/Component');

const createBuild = async (req, res) => {
    try {
        const { components, name } = req.body;
        const userId = req.user.id;

        // Calcular precio total
        let totalPrice = 0;
        for (const item of components) {
            const component = await Component.findById(item.component);
            totalPrice += component.price * item.quantity;
        }

        const build = await Build.create({
            user: userId,
            name,
            components,
            totalPrice
        });

        res.status(201).json(build);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBuild };