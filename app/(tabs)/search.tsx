import { View, Text, Image, FlatList, ImageBackgroundBase, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/searchBar'

const search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    data: movies,
    loading: moviesLoading,
    error: moviesError

  } = useFetch( () => fetchMovies({
     query: searchQuery}
    ), false)
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className= "flex-1 absolute w-full z-0"
       resizeMode= "cover"/>

       <FlatList 
       data = {movies}
       renderItem={({item}) => <MovieCard {...item} />}
       keyExtractor={(item) => item.id.toString()}
       className="px-5"
       numColumns={3}
       columnWrapperStyle={{
        justifyContent: 'center',
        gap: 16,
        marginVertical: 13

       }}

       contentContainerStyle= {{paddingBottom: 100}}

       ListHeaderComponent={
        <>
        <View className="w-full flex-row justify-center mt-20">
          <Image source={icons.logo} className="w-12 h-19"/>
        </View>

        <View className= "my-5">
          <SearchBar placeholder="Search Movies..."
          value = {searchQuery}
          onChangeText={(text:string)=> setSearchQuery(text)}
          />
        </View>

        {moviesLoading && (
          <ActivityIndicator size="large" color="#000ff" className="my-3"/>
        )}

        {moviesError && (
          <Text className="text-red-500 px-5 my-3">
            Error: {moviesError.message}
          </Text>
        )}

        {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length> 0 && (
          <Text className="text-xl text-white font-bold">
            Search Results for {''}
            <Text className="text-accent">{searchQuery}</Text>
          </Text>

        )}
        
        </>
       }

       
       />

    </View>
  )
}

export default search