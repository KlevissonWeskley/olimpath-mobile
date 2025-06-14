import { FlatList, Linking, ScrollView, TextInput, View, ActivityIndicator } from 'react-native'
import { ButtonPdf, Input, LibraryContainer } from './styles'
import { TextBase } from '../../components/text'
import { FontAwesome6 } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { Filter } from '../../components/filter'
import { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { api } from '../../lib/axios'

type PdfMaterial = {
  name: string
  driveURL: string
  year?: string
}

type MaterialItem = {
  olympiad: string
  pdfs: PdfMaterial[]
}

export function Library() {
  const [materials, setMaterials] = useState<MaterialItem[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string | null>('OBMEP')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const response = await api.get('/olympiads/materials')
        setMaterials(response.data.materials)
      } catch (error) {
        console.error('Erro ao buscar materiais:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMaterials()
  }, [])

  const olympiads = materials.map(item => item.olympiad)
  const selectedMaterials = materials.find(m => m.olympiad === selectedFilter)

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.gray900, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.purple300} />
      </View>
    )
  }

  return (
    <LibraryContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextBase variant='bold' size={22} color={COLORS.gray100}>Explore os materiais</TextBase>

        <Input>
          <TextInput
            placeholder="Buscar livro"
            autoCapitalize="none"
            style={{ flex: 1 }}
            placeholderTextColor={COLORS.gray100}
          />
          <FontAwesome6 name="magnifying-glass" color={COLORS.gray100} size={30} />
        </Input>

        <TextBase variant='bold' size={18} color={COLORS.gray100}>Filtrar</TextBase>

        <FlatList
          data={olympiads}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              item={item}
              isSelected={item === selectedFilter}
              onPress={() => setSelectedFilter(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingVertical: 8 }}
        />

        <View style={{ marginTop: 20 }}>
          {selectedMaterials?.pdfs.map((pdf, index) => (
            <ButtonPdf key={index} onPress={() => Linking.openURL(pdf.driveURL)}>
              <TextBase color={COLORS.gray100}>
                {'year' in pdf ? `${pdf.year} - ${pdf.name}` : pdf.name}
              </TextBase>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons
                  name='file-pdf-box'
                  size={30}
                  color={COLORS.red300}
                />
              </View>
            </ButtonPdf>
          ))}
        </View>
      </ScrollView>
    </LibraryContainer>
  )
}
