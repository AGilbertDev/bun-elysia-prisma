const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

const todoCreate = [
    {
        id: 1,
        title: 'Task 1',
        description: 'Description for Task 1',
        completed: false,
    },
    {
        id: 2,
        title: 'Task 2',
        description: 'Description for Task 2',
        completed: false,
    },
    {
        id: 3,
        title: 'Task 3',
        description: 'Description for Task 3',
        completed: false,
    },
    {
        id: 4,
        title: 'Task 4',
        description: 'Description for Task 4',
        completed: false,
    },
    {
        id: 5,
        title: 'Task 5',
        description: 'Description for Task 5',
        completed: false,
    },
    {
        id: 6,
        title: 'Task 6',
        description: 'Description for Task 6',
        completed: false,
    }
]

const seed = async (todos) =>
{
    for (let i = 0; i < todos.length; i++)
    {
        await client.todo.upsert({
            where: {
                id: todos[i].id
            },
            update: todos[i],
            create: todos[i]
        });
    }
};


seed(todoCreate)
    .then(() => { console.log("Data seeded successfully") })
    .catch(error => { console.log("Data seed failed", error) })
    .finally(() =>
    {
        client.$disconnect()
        console.log("Client disconnected successfully")
    })
