import { useState, useEffect, useCallback } from 'react';
import * as adminApi from '../api/adminApi';

/**
 * Advanced admin hook that wraps API calls with loading/error states
 * Usage: const { data, loading, error, refetch } = useAdminApi(apiFunction, params)
 */
export const useAdminApi = (apiFunction, params = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunction(params);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, params]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
};

/**
 * Hook for admin mutations (POST, PATCH, DELETE)
 * Usage: const { execute, loading, error } = useAdminMutation(apiFunction)
 */
export const useAdminMutation = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await apiFunction(...args);
      setSuccess(true);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'An error occurred';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { execute, loading, error, success };
};

/**
 * Hook for list management with pagination, search, and filters
 */
export const useAdminList = (apiFunction, initialParams = {}) => {
  const [params, setParams] = useState({
    page: 1,
    page_size: 10,
    search: '',
    ordering: '-created_at',
    ...initialParams,
  });
  
  const { data, loading, error, refetch } = useAdminApi(apiFunction, params);

  const handlePageChange = useCallback((page) => {
    setParams(p => ({ ...p, page }));
  }, []);

  const handleSearch = useCallback((search) => {
    setParams(p => ({ ...p, search, page: 1 }));
  }, []);

  const handleSort = useCallback((field) => {
    setParams(p => ({
      ...p,
      ordering: p.ordering === field ? `-${field}` : field,
    }));
  }, []);

  const handleFilter = useCallback((filters) => {
    setParams(p => ({ ...p, ...filters, page: 1 }));
  }, []);

  return {
    data: data?.results || data || [],
    total: data?.count || 0,
    loading,
    error,
    params,
    refetch,
    handlePageChange,
    handleSearch,
    handleSort,
    handleFilter,
  };
};

export default useAdminApi;
