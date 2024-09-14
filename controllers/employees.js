const { prisma } = require('../prisma/prisma-client')
const multer = require('multer');



const getAll = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany()


        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({message: `${error}`})
    }
}

const addPerson = async (req, res) => {
    const { firstName, lastName, age, role, userId, photo } = req.body;

  try {
    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        age,
        role,
        photo,
        userId: req.user.id,
      },
    });
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при создании сотрудника');
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

const likePerson = async (req, res) => {
    // const data = req.user
    
    const ownerId = req.user.id
    const { id } = req.params

    try {
        const like = await prisma.employeeLike.create({
            data: {
            ownerId,
              employeeId: id
            },
          });

        res.status(200).json(like)
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message: 'Что то пошло не так....'})
    }

}

const unLikePerson = async (req, res) => {
    const { id } = req.params
    const ownerId = req.user.id
    
    try {
        const unlike = await prisma.employeeLike.delete({
            where: {
              ownerId
            },
          });

        res.status(200).json({message: 'Лайк удалён'})
    } catch (error) {
        console.error('Ошибка при удалении:', error);
        res.status(500).json({message: 'Что то пошло не так....'})
    }

}


const dislikePerson = async (req, res) => {

    const ownerId = req.user.id
    const { id } = req.params

    try {
        const dislike = await prisma.employeeDislike.create({
            data: {
            ownerId,
              employeeId: id
            },
          });

        res.status(200).json(dislike)
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message: 'Что то пошло не так....'})
    }

}

const unDislikePerson = async (req, res) => {
    const { id } = req.params
    const ownerId = req.user.id
    try {
        const person = await prisma.employeeDislike.delete({
            where: {
                ownerId
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
    getPerson,
    likePerson,
    unLikePerson,
    dislikePerson,
    unDislikePerson
}