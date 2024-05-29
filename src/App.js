import './App.css';

function App() {
  const [data,setData]=useState([]) 
  
  const url="https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=1d8f871544f94cf9bc6b9eff355319b8"
  useEffect(()=>{
    fetch(url)
    .then(response =>response.json())
    .then(json=>{
      console.log("news",json)
      setData(json)
    }).catch(e=>{
      console.log("e",e)
    })
  },[])
  return (
    <div className="App">
      <h2>Welcome</h2>
      {
        data.map(item=>{
          return (
            <div>{item.articles}</div>
          )
        })
      }
      </div>
  );
}

export default App;
