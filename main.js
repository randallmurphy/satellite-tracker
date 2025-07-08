//api keys;
//.gitignore;
//chaining calls;

//create event listener
//pull out value from text boxes;
//make api call with address and api key;
//https://geocode.maps.co/search?q=&api_key=
//we get coordinates => make satelite api call with norad code;
//https://sat.terrestre.ar/passes/25544?lat=35.14&lon=-90.05&limit=1
// we get eh data on the rise, set , etc => display to html;

const locationInput = document.querySelector('#location');
const norad = document.querySelector('#norad');
const searchBtn = document.querySelector('#search');
const domOutput = document.querySelector('#domOutput');

//       searchBtn.addEventListener('click', ()=>{
//         const address = encodeURIComponent(locationInput.value);
//         const noradCode = encodeURIComponent(norad.value);
//         fetch((`https://geocode.maps.co/search?q=${address}&api_key=681ba5ddc89e1001753104wiudb1ee2`))
//             .then(res => res.json())
//             .then((response)=>{
//                 console.log(response)
//                  const lat = response[0].lat;
//                  const lon = response[0].lon;
//                 return fetch(`https://sat.terrestre.ar/passes/${noradCode}?lat=${lat}&lon=${lon}`)
//             })
//             .then(rawResponse => rawResponse.json())
//             .then((response)=>{
//                 console.log(response);
//                 domOutput.innerHTML = `
//                 <table class='table'>
//     <thead class='thead'>
//       <tr class='table'>
//         <th>RISE</th>
//         <th>CULMINATION</th>
//         <th>SET</th>
//       </tr>
//     </thead>
//     <tbody class='tbody'>
//       <tr>
//         <td>${response[0].rise.utc_datetime}</td>
//         <td>${response[0].culmination.utc_datetime}</td>
//         <td>${response[0].set.utc_datetime}</td>
//       </tr>
//     </tbody>
//   </table>
//      `
//             })
//             .catch((err)=>{
//                 console.log('something is wrong', err)
//             })
//         })


//try async/await;

searchBtn.addEventListener('click', async () => {
  try {
    const address = encodeURIComponent(locationInput.value);
    const noradCode = encodeURIComponent(norad.value);

    // First fetch: Geocode
    const geoRes = await fetch(`https://geocode.maps.co/search?q=${address}&api_key=${api_Key}`);
        console.log(geoRes)
    const geoData = await geoRes.json();
        console.log(geoData)
    const lat = geoData[0].lat;
    const lon = geoData[0].lon;

    // Second fetch: Satellite pass
    const satRes = await fetch(`https://sat.terrestre.ar/passes/${noradCode}?lat=${lat}&lon=${lon}&limit=1`);
        console.log(satRes)
    const satData = await satRes.json();
        console.log(satData)
    // Display results
    domOutput.innerHTML = `
      <table class='table'>
        <thead class='thead'>
          <tr class='table'>
            <th>RISE</th>
            <th>CULMINATION</th>
            <th>SET</th>
          </tr>
        </thead>
        <tbody class='tbody'>
          <tr>
            <td>${satData[0].rise.utc_datetime}</td>
            <td>${satData[0].culmination.utc_datetime}</td>
            <td>${satData[0].set.utc_datetime}</td>
          </tr>
        </tbody>
      </table>
    `
  } catch (error) {
    console.error('something went wrong', error);
     }
});