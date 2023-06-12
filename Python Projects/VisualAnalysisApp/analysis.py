import streamlit as st 
import pandas as pd 
import numpy as np
import matplotlib.pyplot as plt 
import matplotlib
matplotlib.use('Agg')
import seaborn as sns 
st.title("Machine Learning Data Analysis and Data Visualization")
html_temp = """
	<div style="background-color:white;"><p style="color:black;font-size:50px;padding:10px"></p></div>
	"""
st.markdown(html_temp,unsafe_allow_html=True)
st.subheader("Choose a Dataset For Analysis")
st.set_option('deprecation.showfileUploaderEncoding', False) 
uploaded_file=st.file_uploader(label="Upload your CSV file", type=['csv'])
df=pd.DataFrame([1,2,3])
if uploaded_file is not None:
	df=pd.read_csv(uploaded_file)
	st.write(df.head())
def main():
	if st.button("Column Names"):
		st.write(df.columns)
	if st.checkbox("Shape of Dataset"):
		data_dim = st.radio("Show Dimension By ",("Rows","Columns"))
		if data_dim == 'Rows':
			st.text("Number of Rows")
			st.write(df.shape[0])
		elif data_dim == 'Columns':
			st.text("Number of Columns")
			st.write(df.shape[1])
		else:
			st.write(df.shape)
	if st.checkbox("Select Columns To Show"):
		all_columns = df.columns.tolist()
		selected_columns = st.multiselect("Select",all_columns)
		new_df = df[selected_columns]
		st.dataframe(new_df)
	if st.button("Value Counts"):
		st.text("Value Counts By Class")
		st.write(df.iloc[:,-1].value_counts())
	if st.button("Data Types"):
		st.write(df.dtypes)
	if st.checkbox("Summary"):
		st.write(df.describe().T)
	st.subheader("Data Visualization")
	if st.checkbox("HeatMap Visualization"):
		st.write(sns.heatmap(df.corr(),annot=True,cmap="BuPu"))
		st.pyplot()
	if st.checkbox("Pie Plot"):
		all_columns_names = df.columns.tolist()
		if st.button("Generate Pie Plot"):
			st.success("Generating A Pie Plot")
			st.write(df.iloc[:,-1].value_counts().plot.pie(autopct="%1.1f%%",shadow=True,startangle=90,colors = plt.cm.BuPu(np.linspace(0, 1, 7))))
			st.pyplot()
	if st.checkbox("Plot of Value Counts"):
		st.text("Value Counts By Target")
		all_columns_names = df.columns.tolist()
		primary_col = st.selectbox("Primary Columm to GroupBy",all_columns_names)
		selected_columns_names = st.multiselect("Select Columns",all_columns_names)
		if st.button("Plot"):
			st.text("Generate Plot")
			if selected_columns_names:
				vc_plot = df.groupby(primary_col)[selected_columns_names].count()
			else:
				vc_plot = df.iloc[:,-1].value_counts()
			st.write(vc_plot.plot(kind="bar"))
			st.pyplot()
	st.subheader("Customizable Plot")
	all_columns_names = df.columns.tolist()
	type_of_plot = st.selectbox("Select Type of Plot",["area","bar","line","hist","box","kde"])
	selected_columns_names = st.multiselect("Select Columns To Plot",all_columns_names)
	if st.button("Generate Plot"):
		st.success("Generating Customizable Plot of {} for {}".format(type_of_plot,selected_columns_names))
		if type_of_plot == 'area':
			cust_data = df[selected_columns_names]
			st.area_chart(cust_data)
		elif type_of_plot == 'bar':
			cust_data = df[selected_columns_names]
			st.bar_chart(cust_data)
		elif type_of_plot == 'line':
			cust_data = df[selected_columns_names]
			st.line_chart(cust_data)
		elif type_of_plot:
			cust_plot= df[selected_columns_names].plot(kind=type_of_plot)
			st.write(cust_plot)
			st.pyplot()
	if st.button("Thanks"):
		st.balloons()
if __name__ == '__main__':
	main()