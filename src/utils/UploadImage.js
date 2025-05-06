import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);

        const response = await Axios({
            ...SummaryApi.uploadImage,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data', // Ensures the correct content type for file uploads
                // Add other headers like Authorization if necessary
            },
        });

        // Check if the response is valid and has a data object
        if (response && response.data) {
            return response;
        } else {
            throw new Error('No data returned from the image upload API');
        }
    } catch (error) {
        // Log error for debugging
        console.error('Image upload failed:', error);

        // Return the error object with a message to show to the user
        return { error: error.message || 'Image upload failed. Please try again.' };
    }
};

export default uploadImage;



// import Axios from '../utils/Axios'
// import SummaryApi from '../common/SummaryApi'

// const uploadImage = async(image)=>{
//     try {
//         const formData = new FormData()
//         formData.append('image',image)

//         const response = await Axios({
//             ...SummaryApi.uploadImage,
//             data : formData
//         })

//         return response
//     } catch (error) {
//         return error
//     }
// }

// export default uploadImage