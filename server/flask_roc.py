from flask_restful import Api, Resource, reqparse
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_curve
import pandas as pd
import numpy as np
import json
from flask_cors import CORS, cross_origin
from flask import Flask, request, render_template,jsonify
from sklearn.preprocessing import StandardScaler,MinMaxScaler

app = Flask(__name__)
api = Api(app)
CORS(app, support_credentials=True)
# Define parser and request args
parser = reqparse.RequestParser()
parser.add_argument('c', type=float)
parser.add_argument('preprocessing', type=bool, help='Enable analysis')

class Item(Resource):
	
	def get(self):
		#loading the input parameters
		args = parser.parse_args()
		c = args['c'] 
		preprocessing = args['preprocessing'] # Boolean True

		if preprocessing == True:
			scaler = StandardScaler()
			sc_train = scaler.fit_transform(X_train)
		else:
			scaler = MinMaxScaler()
			sc_train = scaler.fit_transform(X_train)
		
		
		# fit the model on the training set
		
		clf = LogisticRegression(C= c, random_state=0, solver='lbfgs',multi_class='ovr').fit(sc_train, y_train)
		# predict probabilities on test set
		
		pred_prob = clf.decision_function(X_test) 
		
		fpr, tpr, thresholds = roc_curve(y_test, pred_prob, pos_label= 1)
		list_return = [{'tpr':float(tpr[i]),'fpr':float(fpr[i]),'threshold':float(thresholds[i])} for i in range(len(thresholds))]
		
		return (list_return)
	
	
api.add_resource(Item, '/')

if __name__ == '__main__':
	# load data
	df = pd.read_csv('data/data.csv')
	print(df)
	xDf = df.loc[:, df.columns != 'Donated']
	y = df['Donated']
	# get random numbers to split into train and test
	np.random.seed(1)
	r = np.random.rand(len(df))
	# split into train test
	X_train = xDf[r < 0.8]
	X_test = xDf[r >= 0.8]
	y_train = y[r < 0.8]
	y_test = y[r >= 0.8]
	
	app.run(debug=True)
	
	