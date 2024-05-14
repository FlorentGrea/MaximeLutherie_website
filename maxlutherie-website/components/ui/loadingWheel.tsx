export default function LoadingWheel() {
    
    return (
        <div className='w-full mt-52 flex justify-center'>
            <div className="
                    h-8 
                    w-8 
                    animate-spin 
                    rounded-full 
                    border-4 
                    border-solid 
                    border-current 
                    border-e-transparent
                    motion-reduce:animate-[spin_1.5s_linear_infinite]
                "
                role="status"
            />
        </div>
)}