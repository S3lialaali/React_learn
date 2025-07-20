import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        {/* Poster */}
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://via.placeholder.com/600x400/1a1a1a/FFFFFF?text=No+Image'
          }}
          className="w-full h-44 rounded-t-lg"
          resizeMode="cover"
        />

        {/* Info Box */}
        <View className="bg-info p-2 rounded-b-lg">
          <Text className="text-sm font-semibold text-white mb-1" numberOfLines={1}>
            {title}
          </Text>

          <View className="flex-row items-center gap-x-1 mb-1">
            <Image source={icons.star} className="w-4 h-4" />
            <Text className="text-xs text-white font-bold">{(vote_average / 2).toFixed(1)}</Text>
          </View>

          <Text className="text-xs text-[#CCCCCC] font-medium">
            {release_date?.split('-')[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard
