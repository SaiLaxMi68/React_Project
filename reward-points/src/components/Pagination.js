const Pagination = ({currentPage, totalPages,onPageChange}) => {
    return (
        <div style={{display:'flex',justifyContent:"center",gap:"8px",marginTop:"20px"}}>
            <button disabled={currentPage===0} onClick={()=>onPageChange(currentPage-1)}>Prev</button>
            {Array.from({length:totalPages},(_,i)=> (
            <button
            key={i}
            onClick={()=>onPageChange(i)}
            style={{
                fontWeight:i===currentPage? 'bold':"normal",
                background:i===currentPage? "#1976d2":"white",
                coloe:i===currentPage?"white":"#1976d2",
                border:"1px solid #1976d2",
                padding:"6px 12px",
                borderRadius:"4px"
            }}
            >
                {i+1}
            </button>
            ))}
            <button disabled={currentPage===totalPages-1} onClick={()=>onPageChange(currentPage+1)}>Next</button>
        </div>
    )
}
export default Pagination;