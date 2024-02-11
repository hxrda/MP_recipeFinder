import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	FlatList,
	Image,
} from "react-native";

export default function App() {
	//States:
	const [keyword, setKeyword] = useState("");
	const [recipes, setRecipes] = useState([]);

	//Functions:
	const fetchRecipes = () => {
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
			.then((response) => {
				if (!response.ok)
					throw new Error("Error in fetch" + response.statusText);
				return response.json();
			})
			.then((data) => {
				setRecipes(data.meals);
				setKeyword("");
			})
			.catch((err) => console.error(err));
	};

	//Rendering:
	return (
		<View style={styles.container}>
			<View style={{ flex: 6, marginTop: 50 }}>
				<FlatList
					data={recipes}
					renderItem={({ item }) => (
						<View>
							<Text>{item.strMeal}</Text>
							<Image
								style={{ width: 150, height: 100 }}
								source={{ uri: `${item.strMealThumb}/preview` }}
							/>
						</View>
					)}
				/>
			</View>

			<View style={{ flex: 1, marginTop: 50 }}>
				<TextInput
					placeholder="Type Ingredient"
					value={keyword}
					onChangeText={(text) => setKeyword(text)}
				/>
				<Button title="Find" onPress={fetchRecipes} />
			</View>

			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
