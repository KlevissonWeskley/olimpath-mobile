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
  year?: string | number
}

type MaterialItem = {
  olympiad: string
  pdfs: PdfMaterial[]
}

type PdfWithOlympiad = PdfMaterial & { olympiad: string }

export function Library() {
  const [materials, setMaterials] = useState<MaterialItem[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string | null>('OBMEP')
  const [isLoading, setIsLoading] = useState(true)
  const [searchText, setSearchText] = useState('')

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

  const allPdfs: PdfWithOlympiad[] = materials.flatMap(material =>
    material.pdfs.map(pdf => ({
      ...pdf,
      olympiad: material.olympiad,
    }))
  )

  const filteredPdfs: PdfWithOlympiad[] = searchText.trim() !== ''
    ? allPdfs.filter(pdf =>
        pdf.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : materials.find(m => m.olympiad === selectedFilter)?.pdfs.map(pdf => ({
        ...pdf,
        olympiad: selectedFilter!,
      })) ?? []

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
            placeholder="Buscar material"
            autoCapitalize="none"
            style={{ flex: 1, color: COLORS.gray100 }}
            placeholderTextColor={COLORS.gray100}
            value={searchText}
            onChangeText={setSearchText}
          />
          <FontAwesome6 name="magnifying-glass" color={COLORS.gray100} size={30} />
        </Input>

        {searchText.trim() === '' && (
          <>
            <TextBase variant='bold' size={18} color={COLORS.gray100}>Filtrar</TextBase>

            <FlatList
              data={materials.map(m => m.olympiad)}
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
          </>
        )}

        <View style={{ marginTop: 20 }}>
            {filteredPdfs.length === 0 ? (
              <TextBase color={COLORS.gray100}>Nenhum material encontrado</TextBase>
            ) : (
            filteredPdfs.map((pdf, index) => (
              <ButtonPdf key={index} onPress={() => Linking.openURL(pdf.driveURL)}>
                  <TextBase color={COLORS.gray100}>
                    {pdf.year ? `${pdf.year} - ` : ''}
                    {pdf.name}
                  </TextBase>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                      name='file-pdf-box'
                      size={30}
                      color={COLORS.red300}
                    />
                  </View>
              </ButtonPdf>
            ))

          )}
        </View>
      </ScrollView>
    </LibraryContainer>
  )
}
