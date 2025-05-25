import {
    CircularProgressbar,
    buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type ScoreBreakdownProps = {
    rating: number;
};

const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ rating }) => {
    const percentage = Math.round(rating * 10);

    return (
        <div className="flex items-center gap-2">
            <div className="w-15 h-15 bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        textSize: '26px',
                        textColor: '#fff',
                        pathTransitionDuration: 0.5,
                        pathTransition: 'stroke-dashoffset 0.5s ease 0s',
                        pathColor: percentage >= 70 ? '#21d07a' : '#d2d531',
                        trailColor: '#424242',
                    })}
                />
            </div>
            <span className="text-lg w-[20px] whitespace-wrap">User Score</span>
        </div>
    );
};

export default ScoreBreakdown;
