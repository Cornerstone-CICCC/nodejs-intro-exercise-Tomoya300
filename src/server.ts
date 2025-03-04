import http from 'http'
import dotenv from 'dotenv'
dotenv.config()

interface Todo {
    id: number,
    task: string,
    isCompleted: boolean
  }
  
  const todos: Todo[] = [
    { id: 1, task: "Wash dishes", isCompleted: false },
    { id: 2, task: "Feed chicken", isCompleted: false }
  ]

const server = http.createServer((request, response) => {

    const { url, method } = request
    
    if (url === '/' && method === 'GET') {
        console.log("someone came to the home page")
        response.writeHead(200, { 'content-type': 'text/html' })
        response.end('<h1>Home</h1>')
        return
    }

    else if (url === '/about' && method === 'GET') {
        console.log('someone came to the about page')
        response.writeHead(200, { 'content-type': 'text/html' })
        response.end('<h1>About</h1>')
        return
    }

    else if (url === '/my-account' && method === 'GET') {
        console.log('someone accessed to my account page')
        response.writeHead(403, { 'content-type': 'text/plain' })
        response.end('You have no access to this page')
        return
    }

        // Get todo by id (/api/todos/item/2)
    if (request.url?.startsWith("/api/todos/item") && request.method === "GET") {
        const id = parseInt(request.url.split("/")[4])
        const todo = todos.find(todo => todo.id === id)

        if (!todo) {
            response.writeHead(404, { "Content-Type": "text/plain" })
            response.end("Todo not found!")
            return;
        }

        response.writeHead(200, { "Content-Type": "application/json" })
        response.end(JSON.stringify(todo))
        return;
    }

    console.log('someone visited invalid url')
    response.writeHead(404, { 'content-type': 'text/plain' })
    response.end('Page not found')
})

const PORT = process.env.BACKEND_PORT || 3000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})