/**
 * Akbar Cricket Club — Central API Client
 * Automatically handles credentials, JSON parsing, error messages, and 401 session expiry.
 */

export const api = {
  async request(endpoint, options = {}) {
    const config = {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        ...options.headers
      },
      ...options
    };

    // If body is object and not FormData, stringify to JSON
    if (config.body && !(config.body instanceof FormData) && typeof config.body === 'object') {
      config.headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(endpoint, config);

      // Handle 401 Unauthorized (Session Expired / Logged Out)
      if (response.status === 401 && !endpoint.includes('/api/auth/login')) {
        window.dispatchEvent(new CustomEvent('auth:expired'));
      }

      const contentType = response.headers.get('content-type');
      let data = null;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const errorMsg = (data && data.message) ? data.message : `HTTP error ${response.status}`;
        const error = new Error(errorMsg);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err.message);
      throw err;
    }
  },

  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  },

  post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body });
  },

  put(endpoint, body) {
    return this.request(endpoint, { method: 'PUT', body });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  },

  upload(endpoint, formData) {
    return this.request(endpoint, {
      method: 'POST',
      body: formData
      // Note: do not set Content-Type header so browser sets multipart boundary automatically
    });
  }
};
