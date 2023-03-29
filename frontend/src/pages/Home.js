import Table from "../components/Table";

function Home({products}){
  return (
    <div>
      <Table products={products}/>
    </div>
  )
}
export default Home;