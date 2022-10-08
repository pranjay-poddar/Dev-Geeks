import vehicle_detection as vhd


if __name__ == "__main__":
    vehicle_det_obj = vhd.vehicle_detection(STREAM_URL="./data/4.mp4",
                                            skip_steps=1,
                                            replicate=False)
    vehicle_det_obj.configure(True)
    vehicle_det_obj.runner()
