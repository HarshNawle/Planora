import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// 🧠 What is happening?
// ✅ 1. api.interceptors.request.use(...)

// This tells Axios:
// 👉 “Before sending any request, run this function.”

// It acts like a middleware for outgoing requests.


apiClient.interceptors.request.use((config) => {
    // ✅ 2. (config) => { ... }
    
    // config contains the request details:
    
    // URL
    
    // headers
    
    // method
    
    // body
    
    // You can modify the request before it is sent.
    const token = localStorage.getItem("token");
    // ✅ 3. const token = localStorage.getItem("token");
    
    // Gets the saved authentication token from browser storage.
    
    // Usually stored after login.
    
    // Example stored value:
    
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    if (token) {
        
        // ✅ 4. if (token) { ... }
        
        // Checks if token exists.
        
        // Prevents sending empty Authorization header.
        config.headers.Authorization = `Bearer ${token}`;
        // ✅ 5. config.headers.Authorization = \Bearer ${token}`;`
        
        // This is the most important line 🔥
        
        // It adds this header to every request:
        
        // Authorization: Bearer YOUR_TOKEN_HERE
        
        // 👉 Required for protected APIs
        // 👉 Backend uses this to verify the user
    }
    
    return config;
    
    // ✅ 6. return config;
    
    // VERY IMPORTANT ❗
    
    // Axios must receive the modified config.
    
    // If you forget this → request will fail.
});

apiClient.interceptors.response.use((response) => response,
    (error) => {
        if(error.response && error.response.status === 401) {
            // Dispatch a custom event to trigger logout in AuthProvider
            window.dispatchEvent(new Event("force-logout"));
        }
        return Promise.reject(error);
    }
);


// ✅ This is professional-grade pattern.

const postData = async <T>(url: string, data: unknown): Promise<T> => {
    const response = await apiClient.post(url, data);
    
    return response.data;
}

const fetchData = async <T> (url: string): Promise<T> => {
    const response = await apiClient.get(url);

    return response.data;
}

const updateData = async <T>(url: string, data: unknown): Promise<T> => {
    const response = await apiClient.put(url, data);

    return response.data;
}

const deleteData = async <T>(url: string): Promise<T> => {
    const response = await apiClient.delete(url);

    return response.data;
}

export { postData, fetchData, updateData, deleteData };