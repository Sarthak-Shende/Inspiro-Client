import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5000",
});

api.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}

	return req;
});

export const fetchPostsAPI = async ({ page }) => {
	try {
		const response = await api.get(`/posts?page=${page}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching posts:", error);
	}
};

export const fetchPostsBySearchAPI = async (searchQuery) => {
	try {
		const response = await api.get(
			`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
				searchQuery.tags
			}`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching searched posts:", error);
	}
};

export const createPostAPI = async (newPost) => {
	try {
		const response = await api.post("/posts", newPost);
		return response.data;
	} catch (error) {
		console.error("Error creating posts:", error);
	}
};

export const updatePostAPI = async ({ id, updatedPost }) => {
	try {
		const response = await api.patch(`/posts/${id}`, updatedPost);
		return response.data;
	} catch (error) {
		console.error("Error updating posts:", error);
	}
};

export const deletePostAPI = async (id) => {
	try {
		await api.delete(`/posts/${id}`);
	} catch (error) {
		console.error("Error deleting posts:", error);
	}
};

export const likePostAPI = async (id) => {
	try {
		const response = await api.patch(`/posts/${id}/likePost`);
		return response.data;
	} catch (error) {
		console.error("Error updating posts:", error);
	}
};

export const signinAPI = async (formData) => {
	try {
		const response = await api.post(`/user/signin`, formData);
		return response.data;
	} catch (error) {
		console.error("Error in signing in:", error);
	}
};

export const signupAPI = async (formData) => {
	try {
		const response = await api.post(`/user/signup`, formData);
		return response.data;
	} catch (error) {
		console.error("Error in signing up:", error);
	}
};
