const employeeService = require("../services/employee.service");

const createEmployee = async (req, res) => {
    try {
        const newEmployee = employeeService.createEmployee(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        throw error("employee couldn't have been created")
    }
}

module.exports = createEmployee;