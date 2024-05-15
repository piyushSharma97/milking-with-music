

const MilkingHistoryPage = () => {
    const milkingHistory = JSON.parse(localStorage.getItem('milkingHistory')) || [];
    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Milking History</h1>
        {/* Display milking history */}
        {milkingHistory.length?(
            <>
             <div className="table-responsive">
        <table className="table table-striped table-bordered">
        <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Total Duration</th>
            </tr>
          </thead>
          <tbody>
          <tbody>
            {milkingHistory.map((session, index) => (
              <tr key={index}>
                <td>{session.date}</td>
                <td>{session.startTime}</td>
                <td>{session.endTime}</td>
                <td>{session.duration}</td>
              </tr>
            ))}
          </tbody>
          </tbody>
        </table>
        </div>
            </>
        ):(
            <>
              <div className="alert alert-info" role="alert">
          No milking history available.
        </div>
            </>
        )}
       

      </div>
    );
  };
  
  export default MilkingHistoryPage;