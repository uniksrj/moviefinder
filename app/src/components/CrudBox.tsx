interface CrudBoxProps {
    data: { id: number | string; title: string; body: string }[];
    handleEdit: (id: number | string) => void;
    handleDelete: (id: number | string) => void;
}

export const CrudBox = ({ data, handleEdit, handleDelete }: CrudBoxProps) => {
    return (
        <div className="px-4 mt-8 my-10 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 styled-table">               
                <thead className="bg-gray-50">
                    <tr>
                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr.No</td>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Post Content
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                                No posts found
                            </td>
                        </tr>
                    )}
                    {data.map((item: any, index) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="w-12 px-3 py-4 text-center text-sm font-medium text-gray-700">
                                {index + 1}
                                </td>
                            <td className="w-48 px-6 py-4">
                                <div className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</div>
                            </td>
                            <td className="px-6 py-4 max-w-xl">
                                <div className="text-sm text-gray-500 line-clamp-2">{item.body}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => handleEdit(item.id)}
                                    className="mr-2 text-blue-600 hover:text-blue-900 transition-colors cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-600 hover:text-red-900 transition-colors cursor-pointer "
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}