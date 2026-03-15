import random
import numpy as np
from deap import base, creator, tools, algorithms


def evaluate_solution(individual, model):

    temperature, pressure, humidity, motor_speed, compression_force, flow_rate, power, vibration = individual

    X = np.array([[temperature, pressure, humidity, motor_speed,
                   compression_force, flow_rate, power, vibration]])

    quality = model.predict(X)[0]

    carbon = power * 0.475
    energy = power

    return quality, carbon, energy


def run_nsga_optimization(model):

    creator.create("FitnessMulti", base.Fitness, weights=(1.0, -1.0, -1.0))
    creator.create("Individual", list, fitness=creator.FitnessMulti)

    toolbox = base.Toolbox()

    toolbox.register("temperature", random.uniform, 30, 40)
    toolbox.register("pressure", random.uniform, 0.8, 1.2)
    toolbox.register("humidity", random.uniform, 30, 50)
    toolbox.register("motor_speed", random.uniform, 100, 150)
    toolbox.register("compression_force", random.uniform, 3, 7)
    toolbox.register("flow_rate", random.uniform, 1, 2)
    toolbox.register("power", random.uniform, 20, 30)
    toolbox.register("vibration", random.uniform, 2, 5)

    toolbox.register("individual", tools.initCycle,
                     creator.Individual,
                     (toolbox.temperature,
                      toolbox.pressure,
                      toolbox.humidity,
                      toolbox.motor_speed,
                      toolbox.compression_force,
                      toolbox.flow_rate,
                      toolbox.power,
                      toolbox.vibration),
                     n=1)

    toolbox.register("population", tools.initRepeat, list, toolbox.individual)

    toolbox.register("evaluate", evaluate_solution, model=model)

    toolbox.register("mate", tools.cxBlend, alpha=0.5)

    toolbox.register("mutate", tools.mutGaussian, mu=0, sigma=1, indpb=0.2)

    toolbox.register("select", tools.selNSGA2)

    population = toolbox.population(n=20)

    algorithms.eaMuPlusLambda(
            population,
            toolbox,
            mu=20,
            lambda_=40,
            cxpb=0.7,
            mutpb=0.2,
            ngen=10,
            verbose=False
    )

    return population



def extract_pareto(population):

    pareto_points = []

    for ind in population:

        quality, carbon, energy = ind.fitness.values

        pareto_points.append({
            "quality": quality,
            "carbon": carbon,
            "energy": energy
        })

    return pareto_points