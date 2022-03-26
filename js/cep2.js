const configs = {
    method: 'GET',
    mode: 'cors',
    cache: 'default' ,
    redirect: 'follow',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
}

const results = document.getElementById('results')

const searchCep = (event) => {
    startPreloader()

    results.display = 'none'
    
    search()
    
    event = event || window.event
    if (event.preventDefault) event.preventDefault()
    if (event.preventValue) event.preventValue()
    return false
}

const search = async() => {
    const cep = document.getElementById('cep').value || '00000000'
    
    try {
        const result = await fetch(`https://viacep.com.br/ws/${cep}/json/`, configs)
        const data = await result.json()

        if (data.erro === true) {
            results.style.display = 'none'
            throw 'CEP NÃO ENCONTRADO !!!'
        }
        
        showResults(data)
    } catch(error) {
        console.log(error)

        swal("Erro", 'CEP NÃO ENCONTRADO !!!', "error")
    }
    
    endPreloader()
}

const showResults = (address) => {
    results.style.display = 'block'

    const html = `
    <ul class="list-group">
        <li class="list-group-item"><strong>CEP:</strong> ${address.cep}</li>
        <li class="list-group-item"><strong>Cidade:</strong> ${address.localidade}</li>
        <li class="list-group-item"><strong>Estado:</strong> ${address.uf}</li>
        <li class="list-group-item"><strong>Logradouro:</strong> ${address.logradouro}</li>
    </ul>
    `

    results.innerHTML = html
}