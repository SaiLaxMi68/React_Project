import React, {useEffect, useState} from 'react';
import { fetchTransactionData } from './services/api';
import { logEvent } from './utils/logger';
import CustomerTable from './components/CustomerTable';
const App = ()=> {
  const [data,setData] =useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(null);
  useEffect(()=>{
    async function getData() {
      try {
        const result = await fetchTransactionData();
        setData(result);
        logEvent("FETCH_SUCCESS",result);
      } catch(err) {
        setError(err.message);
        logEvent("FETCH_FAILURE",err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  },[]);
  if(loading) {
    return <div>Loading......</div>
  }
  if(error) {
    return <div>Error loading data: {error}</div>;
  }
  return <CustomerTable data={data} />

}
export default App;