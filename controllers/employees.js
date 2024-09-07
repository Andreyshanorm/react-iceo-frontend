const { prisma } = require('../prisma/prisma-client')

const getAll = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany()


        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({message: 'Что то пошло не так....'})
    }
}

const addPerson = async (req, res) => {
    try {
        const data = req.body

        if(!data.firstName || !data.lastName || !data.age || !data.role){
            return res.status(400).json({message: 'Не все поля заполнены'})
        }


        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id
            }
        })

        
        return res.status(201).json(employee)


    } catch (error) {
        res.status(500).json({message: 'Что то пошло не так....'})
    }
}

const removePerson = async (req, res) => {
    const {id} = req.body

    try {
        await prisma.employee.delete({
            where: {
                id
            }
        })

        res.status(204).json({message: 'Удалён'})
    } catch (error) {
        res.status(500).json({message: 'Что то пошло не так....'})
    }

}

const editPerson = async (req, res) => {
    const data = req.body
    const id = data.id

    try {
        await prisma.employee.update({
            where: {
                id
            },
            data: data
        })

        res.status(204).json({message: 'Данные изменены'})
    } catch (error) {
        res.status(500).json({message: 'Что то пошло не так....'})
    }
}

const getPerson = async (req, res) => {
    const { id } = req.params

    try {
        const person = await prisma.employee.findUnique({
            where: {
                id
            }
        })

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({message: 'Что то пошло не так....'})
    }

}



module.exports = {
    getAll,
    addPerson,
    removePerson,
    editPerson,
    getPerson
}