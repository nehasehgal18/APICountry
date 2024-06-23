const containerClass = document.querySelector('.container')
const filterByRegion = document.querySelector('.dropdown')
const searchField = document.querySelector('.searching input')
const themeChanger = document.querySelector('.cornerside p')
let allCountriesData

let darkMode = localStorage.getItem("dark-mode");
const enableDarkMode = () => {
    document.body.classList.add('dark')
    localStorage.setItem('dark-mode', 'enabled')
}
const disableDarkMode = () => {
    document.body.classList.remove('dark')
    localStorage.setItem('dark-mode', 'disabled')
}
if(darkMode === 'enabled'){
    enableDarkMode(); // set state of darkMode on page load
}
themeChanger.addEventListener('click', () => {
    darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
    if(darkMode === 'disabled'){
        enableDarkMode();
    }
    else{
        disableDarkMode();
    }
    // document.body.classList.toggle('dark')
})

fetch('https://restcountries.com/v3.1/all')
.then((res) => res.json())
.then((data) => {
    renderCountries(data)
    allCountriesData  = data
})

filterByRegion.addEventListener('change' , (e) => {
    // console.log(e.target.value);
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
.then((res) => res.json())
.then(renderCountries)   
} )

function renderCountries(data){
    containerClass.innerHTML = ''
    data.forEach((country) => {
        console.log(country);
        const contClass = document.createElement('a')
contClass.classList.add('cont')
contClass.href = `./country.html?name=${country.name.common}`
const innerCards = `<img class="flags" src=${country.flags.svg} alt="">
                <div class="content">
                    <h1>${country.name.common}</h1>
                    <p><b>Population:</b> ${country.population.toLocaleString('en-IN')}</p>
                    <p><b>Region:</b> ${country.region}</p>
                    <p><b>Capital:</b> ${country.capital}</p>
                </div> `

        contClass.innerHTML = innerCards
        containerClass.append(contClass)

    }) 

}

searchField.addEventListener('input', (e) =>{
    // console.log(e.target.value)
    // console.log(allCountriesData)
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    // console.log(filteredCountries);
    renderCountries(filteredCountries)
})

// themeChanger.addEventListener('click', () => {
//     document.body.classList.toggle('dark')
// })


