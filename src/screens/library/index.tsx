import { FlatList, Linking, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import { ButtonPdf, Input, LibraryContainer } from './styles'
import { TextBase } from '../../components/text'
import { FontAwesome6 } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { Filter } from '../../components/filter'
import { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { materials } from '../../../materials'

export function Library() {
    const olympiads = materials.map(item => item.olympiad)
    const [selectedFilter, setSelectedFilter] = useState<string | null>('OBMEP')

    const selectedMaterials = materials.find(m => m.olympiad === selectedFilter)

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

                    <>
                        <FontAwesome6 
                            name="magnifying-glass"
                            color={COLORS.gray100}
                            size={30}
                        />
                    </>
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