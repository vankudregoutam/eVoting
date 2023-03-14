import React from 'react';
import View from './View';

function UserHome() {
    return (
        <div className="view-container">
            <>
                <div className="table-responsive">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Party Name</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <View />
                        </tbody>
                    </table>
                </div>
            </>
        </div>
    )
}

export default UserHome
