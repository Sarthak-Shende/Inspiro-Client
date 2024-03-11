import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5000/posts",
});

export const fetchPostsAPI = async () => {
	try {
		const response = await api.get();
		return response.data;
	} catch (error) {
		console.error("Error fetching posts:", error);
	}
};

export const createPostAPI = async (newPost) => {
	try {
		const response = await api.post("/", newPost);
		return response.data;
	} catch (error) {
		console.error("Error creating posts:", error);
	}
};

export const updatePostAPI = async ({ id, updatedPost }) => {
	try {
		const response = await api.patch(`/${id}`, updatedPost);
		return response.data;
	} catch (error) {
		console.error("Error updating posts:", error);
	}
};

export const deletePostAPI = async (id) => {
	try {
		await api.delete(`/${id}`);
	} catch (error) {
		console.error("Error deleting posts:", error);
	}
};

export const likePostAPI = async (id) => {
	try {
		const response = await api.patch(`/${id}/likePost`);
		return response.data;
	} catch (error) {
		console.error("Error updating posts:", error);
	}
};
