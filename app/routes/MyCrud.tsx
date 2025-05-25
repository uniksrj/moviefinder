import { useId, useState } from "react";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CrudBox } from "~/src/components/CrudBox";
import { deletePostdata, getPosts, savePostdata } from "~/src/services/Myservices";

const NyCrud = () => {
    const [data, setData] = useState<{ id: number | string; title: string; body: string }[]>([]);
    const [inputValue, setInputValue] = useState({
        title: "",
        body: "",
    });
    const [buttonText, setButtonText] = useState("Publish Post");
    interface NotificationType {
        message: string;
        type: 'success' | 'error' | 'info';
        visible: boolean;
    }

    const getData = async () => {
        try {
            const response = await getPosts();
            return response.map((item: any) => ({
                id: item.id,
                title: item.title || "",
                body: item.body || "",
            }));
        } catch (err) {
            console.log(err);
            return [];
        }
    };



    const handleEdit = (id: number | string) => {
        console.log(`Edit post with ID: ${id}`);
        // Implement edit functionality here
        const postToEdit = data.find((post) => post.id === id);
        if (postToEdit) {
            setInputValue({
                title: postToEdit.title,
                body: postToEdit.body,
            });
        }
        setButtonText("Update Post");
    };

    const handleDelete = async (id: number | string) => {
        try {
            const res = await deletePostdata(id);
            if (res.status === 200) {
                const updatedData = data.filter((item) => item.id !== id);
                setData(updatedData);
                toast.success('Post deleted successfully!');
            }
        } catch (err) {
            console.log(err);
            toast.error('Failed to delete post');
            return [];
        }
    };

    const handlePostdata = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("Input value:", inputValue);
            
            const response = await savePostdata(inputValue);
            console.log("We save the data in post :", response);
            toast.success('Post Saved successfully!');
            return response;
        } catch (err) {
            console.log(err);
            toast.error('Failed to save post');
            return [];
        }
    };

    useEffect(() => {
        getData().then((fetchedData) => {
            console.log(fetchedData);
            setData(fetchedData);
        });

    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">            
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                You write your thoughts here
            </h1>
            <div className="w-full max-w-2xl p-6 space-y-8 bg-white rounded-xl shadow-sm">
                {/* Title Field */}
                <form onSubmit={(e) => { handlePostdata(e); }}>
                    <div className="space-y-1">
                        <label htmlFor="title" className="t ext-sm font-medium text-gray-600">
                            Title
                        </label>
                        <input
                            name="title"
                            type="text"
                            id="title"
                            value={inputValue.title}
                            onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })}
                            className="w-full px-4 py-2.5 text-gray-700 border border-gray-200 rounded-lg transition-all
                 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                 hover:border-gray-300 placeholder-gray-400"
                            placeholder="Enter title..."
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <label htmlFor="post" className="text-sm font-medium text-gray-600">
                            Post Content
                        </label>
                        <textarea
                            name="post"
                            id="post"
                            rows={6}
                            value={inputValue.body}
                            onChange={(e) => setInputValue({ ...inputValue, body: e.target.value })}
                            className="w-full px-4 py-2.5 text-gray-700 border border-gray-200 rounded-lg transition-all
                 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                 hover:border-gray-300 placeholder-gray-400 resize-none"
                            placeholder="Write your post here..."
                        />
                    </div>
                    
                    <button className="w-full px-6 py-3 bg-blue-500 text-white font-medium rounded-lg
                      hover:bg-blue-600 transition-all active:scale-[0.98] shadow-sm cursor-pointer
                      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
                        {buttonText}
                    </button>
                </form>
            </div>
            <CrudBox data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    );
}

export default NyCrud;