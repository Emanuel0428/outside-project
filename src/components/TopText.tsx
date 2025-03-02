import { Cloud } from 'lucide-react';

const TopText = () => {

    return (
        <div className="bg-black text-white py- px-2">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex items-center gap-2 mb-6 md:mb-0">
                        <Cloud className="h-8 w-8 text-purple-500" />
                        <span className="text-2xl font-bold">10% De Descuento en compras superiores </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopText;