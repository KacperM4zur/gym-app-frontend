import React from 'react';
import LayoutLoginUser from "../../components/user_login/LayoutLoginUser.jsx";
import ExerciseHistory from "../../components/user_login/progress_page/ExerciseHistory.jsx";
import ProgressChart from "../../components/user_login/progress_page/ProgressChart.jsx";

const Progress = () => {
    return (
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-6">Monitorowanie Postępów</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/*<ExerciseHistory />*/}
                    {/*<ProgressChart />*/}
                </div>
            </div>
    );
};

export default Progress;
