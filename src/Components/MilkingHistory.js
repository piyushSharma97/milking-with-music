import {useState} from 'react'
import { Button } from 'react-bootstrap';
const MilkingHistoryPage = () => {
    const [milkingHistory, setMilkingHistory] = useState(JSON.parse(localStorage.getItem('milkingHistory')) || []);

    const clearHistory = () => {
        // Clear history from localStorage
        localStorage.removeItem('milkingHistory');
        // Clear milkingHistory state
        setMilkingHistory([]);
    };
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Milking History</h1>
            {/* Display milking history */}
            {milkingHistory.length ? (
                <>
                    <div className="table-responsive">
                        <div className="text-center">
                            <Button variant="danger" onClick={clearHistory}>Clear History</Button>
                        </div>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Start Time</th>
                                    <th scope="col">End Time</th>
                                    <th scope="col">Total Milk Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {milkingHistory.map((session, index) => (
                                    <tr key={index}>
                                        <td>{session.date}</td>
                                        <td>{session.startTime}</td>
                                        <td>{session.endTime}</td>
                                        <td>{session.milkQuantity}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
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