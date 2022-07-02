
function AddPartition(ram_size, part_num){

    size = Math.floor(Math.random() * ram_size / 2) + 2;
    // alert('ram_size: ' + ram_size + '\nsize: ' + size);

    const ram = document.getElementById('ram');

    const node = document.createElement('div')
    const node1 = document.createElement('input');
    node1.type = 'text';
    node1.value = size;
    node1.id = 'partition-' + part_num;
    // const partition_size = document.createTextNode(size);

    // node1.appendChild(partition_size);
    node.appendChild(node1);
    node.className = 'partition';

    ram.appendChild(node);

    return ram_size - size;
}

function AddProcess(process_size, process_num) {

    size = Math.floor(Math.random() * ram_size / 2) + 2;

    const container = document.getElementById('process-container');

    const node = document.createElement('div');
    const node1 = document.createElement('input');

    node1.type = 'text';
    node1.value = size;
    node1.id = 'process-' + process_num;
    node.appendChild(node1);
    node.className = 'process';
    container.appendChild(node);
}


function UpdateType(id) {
    
    if(id == 'static') {
        document.getElementById('partitions').disabled = false;
        document.getElementById('part-size').disabled = false;
    }
    else if (id == 'dynamic') {
        document.getElementById('partitions').disabled = true;
        document.getElementById('part-size').disabled = true;

        document.getElementById('ram').innerHTML = '';
    }
}

function UpdateMemory(id) {

    ram_size = document.getElementById(id).value;
    document.getElementById('ram-size').innerHTML = ram_size;
    document.getElementById('process-container').innerHTML = '';
    document.getElementById('ram').innerHTML = '';

    let max_partition = ram_size / 2;

    document.getElementById('processes').max = max_partition;
    document.getElementById('process-max').innerHTML = max_partition;
    document.getElementById('partitions').max = max_partition;
    document.getElementById('part-max').innerHTML = max_partition;

}

function UpdatePartitions(id) {

    partitions = document.getElementById(id).value;
    document.getElementById('ram').innerHTML = '';
    ram_size = document.getElementById('ram-size').innerHTML;
    max_part_size = ram_size / 2;

    for(i = 0; i < partitions; i++) {
        max_part_size = AddPartition(max_part_size, i + 1);
    }
}

function UpdateProcesses(id) {

    processes = document.getElementById(id).value;
    document.getElementById('process-container').innerHTML = '';
    ram_size = document.getElementById('ram-size').innerHTML;
    max_process_size = ram_size / 2;

    for(i = 0; i < processes; i++) {
        max_process_size = AddProcess(max_process_size, i + 1);
    }
}


function CheckRamPartitionSize(id) {

    partitions = document.getElementById('partitions').value;
    ram_size = document.getElementById('ram-size').innerHTML;
    total_partition_size = 0;

    for(i = 0; i < partitions; i++){
        size = document.getElementById('partition-' + (i + 1)).value;
        size = Number(size);
        total_partition_size += size;
    }

    if(total_partition_size != ram_size) {
        alert('Total partition size must be equal to RAM size!');
    }

    else {
        if(id == 'firstfit'){
            alert(id);
        }
        else if(id == 'nextfit'){
            alert(id);
        }
        else if(id == 'bestfit'){
            alert(id);
        }
        else if(id == 'worstfit'){
            alert(id);
        }
    }

}

    












// COMMENTED EXTRA CODE

    // const techniqueName = document.getElementById(id).id;
    // output.style.textAlign = "right";
    // alert(output.style.backgroundColor);
    // document.getElementsByClassName('output').innerHTML = 'asdsdasd';



