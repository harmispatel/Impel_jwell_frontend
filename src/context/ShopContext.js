import React, { createContext, useContext, useState, useEffect } from "react";
import FilterServices from "../services/Filter";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const userType = localStorage.getItem("user_type");
  const userId = localStorage.getItem("user_id");
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(null);
  const [genderData, setGenderData] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [filterTag, setFilterTag] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [priceRange, setPriceRange] = useState({
    minprice: null,
    maxprice: null,
  });
  const [FilterPriceRange, setFilterPriceRange] = useState({
    minprice: 0,
    maxprice: 0,
  });
  const [paginate, setPaginate] = useState();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    dataShowLength: 40,
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await FilterServices.categoryFilter();
      setCategoryData(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchGenderData = async () => {
    try {
      const response = await FilterServices.genderFilter();
      setGenderData(response.data);
    } catch (error) {
      console.error("Error fetching gender data:", error);
    }
  };

  const fetchFilteredData = async (offset = 0) => {
    setIsLoading(true);
    try {
      const response = await FilterServices.allfilterdesigns({
        category_id: selectedCategory?.value,
        gender_id: selectedGender?.value,
        tag_id: selectedTag?.value,
        search: searchInput,
        min_price: priceRange?.minprice,
        max_price: priceRange?.maxprice,
        offset: offset,
        userType,
        userId,
      });
      setIsLoading(false);
      setFilterTag(response.data?.tags);
      setPaginate(response.data);
      setFilterPriceRange({
        minprice: response.data.minprice,
        maxprice: response.data.maxprice,
      });
      setFilterData(response.data?.designs || []);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPagination = () => {
    setPagination({ currentPage: 1, dataShowLength: 40 });
  };

  const handlePagination = (page) => {
    const newOffset = (page - 1) * pagination.dataShowLength;
    fetchFilteredData(newOffset);
    setPagination({ ...pagination, currentPage: page });
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    if (pagination.currentPage > 1) {
      handlePagination(pagination.currentPage - 1);
    }
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (pagination.currentPage < Math.ceil(paginate?.total_records / 40)) {
      handlePagination(pagination.currentPage + 1);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchGenderData();
    fetchFilteredData()
  }, []);

  return (
    <ShopContext.Provider
      value={{
        categoryData,
        selectedCategory,
        setSelectedCategory,
        searchInput,
        setSearchInput,
        genderData,
        selectedGender,
        setSelectedGender,
        selectedTag,
        setSelectedTag,
        priceRange,
        setPriceRange,
        filterTag,
        filterData,
        paginate,
        pagination,
        FilterPriceRange,
        setPagination,
        fetchFilteredData,
        handlePagination,
        handlePrevPage,
        handleNextPage,
        isLoading,
        setIsLoading,
        resetPagination,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => useContext(ShopContext);