---
id: lean-branding
title: Machine Learning For Absolute Beginners Second Edition
sidebar_label: Lean Branding
---
# Summary

- Contepts of Machine learnings and base Algorithms are explained
- In the later chapters, shows some codes to follow. So readers can try the very basic machine learning algorithms
- Since targeted readers who don't have much machine learning, tried to explain as easy as possible.

# What I liked about

- it can be read without thinking too much
- Rather than comparing many algorithms, book tells me what to try on the next step
- Small sized book

# What I didn't like about

- Although the writer wanted to explain as easy as possible, new words still confuses readers

# Recommend to

- Someone who has programming background
- Type of people who can just skip when they don't understand

# Memo

- Heatmap and Scatterplot are graphs that can be used to analyze relation and corelation. **-1 means perfectly negative relation, 0 means no relation**
- sigmoid function: y = 1/ 1+ e^-x
    - x = independent variable
    - e = Euler's constant = 2.718
    - Sigmoid function converst independent variables into an expression of pobability between 0 and 1 in relation to the dependent variable
- The logistic hyperplane represents a classification boundary rather than a prediction line

## Quantitative vs Qualitative

### Linea Regression

- linear Regression is useful for qualifying relationships between variablesr to a continuous outcome

### Logistic Regression

- For incontinuous 'y', for instance categorical variables
    - ex) new customer, refusing customer
- Logistic regression's core strength lies in binary prediction. Others for Dicision Tree or SVM

### KNN(K-Nearest Neighbor)

- Setting K too low or too high will combile bias
- The algorithm works better with continuos variables
- Not suitable for lorge number of data
    1. it costs too much resource to perform
    2. it can't represent well high dimensions

### K- Means Measuring

- Useful in segmentation
- Setting K is difficult these three are the general way to find K
    1. By using scree plot to find the right spot 
    2. By root n/2
    3. By domain knowledge

### Bias & Variance

- bias is the gap between the value predicted by you model and the actual value
- variance is how scattered predicted values are in relation to each other

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8e922434-f787-4934-8e55-e9c562dbb27b/IMG_15E76B693FDA-1.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8e922434-f787-4934-8e55-e9c562dbb27b/IMG_15E76B693FDA-1.jpeg)

- There's no perfect hyperparameter for all. Finding the right balance it the key
    - Insufficient vs Overfitting

### SVM

- Mostly used for classific technique for predicting categorial outcome

### ANN(Artificial Neural Network)

- Reinforcement learning
- Blackbox Dilema
    - the network can approximately accurate output, tracing its decision structure reveals limited to no insight about how specific variables influence its decision
- When to use?
    - prediction task with large number of input features and complex patterns and especially problem that computes to decipher but trivial for human
- Perceptron
    - Perceptron build prediction model based on 5 steps
        1. Inputs are fed into the processor
        2. Perceptron applies weights to estimate the value of these inputs
        3. Perceptron computes the error between the estimate and the actual value
        4. Perceptron adjust its weight according to the error
        5. These steps are repeated until you are satisfied with the model's accuracy. The training model can then be applied to the test data
    - A weekness of perceptron is a large neural network can introduce polarizing result
    - An alternative is sigmoid newron, rigmoid newron accepts any value between 0 and 1 instead of bynary filter ⇒ output is no longer binary
    - Multilayer Perceptron is an algorithm for predicting a categorical or continuos target variable
- **Deep Learing**
    - at least 5 - 10 node layers in stacks with multiple hyperparameters and explonential inputs

        ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5e495b1b-4e9c-41df-877b-e98687973491/IMG_5CE771506D58-1.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5e495b1b-4e9c-41df-877b-e98687973491/IMG_5CE771506D58-1.jpeg)

### Decision Trees

- Transparent and easy to interpret
- Less data and less computational resources
- Wide range of use cases
    - ex) Scholaship Recipient, predicting e-commerce sales, selecting the right job applicant
- Random Forest
    - works well for obtaining a quick benchmark model
- Boosting
    - A large pool of decision trees
    - At each iteration, weights are added based on the result of the previous iteration
    - Slow process speed (Synced job waiting other trees to finish)

### Ensemble Modeling

- Unified prediction model

### Training data MAE vs Test data MAE

- When there are big difference between them, it's a signal of an overfitting issue
- Optimizing hyperparameter can increase model accuracy.
    - GridSearch: Tries every possible combination
    - RandomizedSearchCV: Randomly once in the range