
function SetValues() {

    document.getElementById('memory').value = 4;
    document.getElementById('partitions').value = 1;
    document.getElementById('processes').value = 1;
}

function AddPartition(ram_size, part_num){

    size = Math.floor(Math.random() * ram_size / 2) + 2;

    const ram = document.getElementById('ram');

    const node = document.createElement('div')
    const node1 = document.createElement('input');
    node1.type = 'text';
    node1.value = size;
    node1.id = 'partition-' + part_num;

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

function SwapIn(process_num, process_size) {

    const ram = document.getElementById('ram');

    const node = document.createElement('div')
    const node1 = document.createElement('input');
    node1.type = 'text';
    node1.readOnly = true;
    node1.value = 'P' + process_num + ': ' + process_size + ' MB';
    node1.id = 'process-' + process_num;

    node.appendChild(node1);
    node.className = 'process';

    ram.appendChild(node);
    // alert('process swapped');
}

function FirstFit(type) {

    if(type == 'dynamic') {

        rem_ram_size = document.getElementById('ram-size').innerHTML;
        rem_ram_size = Number(rem_ram_size);
        processes = document.getElementById('processes').value;

        for(i = 0; i < processes; i++) {
            // alert('processes: ' + processes + '\niteration: ' + i);

            process_size = document.getElementById('process-' + (i + 1)).value;
            process_size = Number(process_size);
            // alert('process-' + (i + 1) + ' size: ' + process_size);

            if(rem_ram_size >= process_size) {
                SwapIn(i + 1, process_size);
                rem_ram_size = rem_ram_size - process_size;
                // alert('rem_ram_size: ' + rem_ram_size);
            }

        }

    }
    else if(type == 'static') {
        alert('static selected!');
    }
}

function CheckAlgo(id, type) {

    if(id == 'firstfit'){
        // alert('Algo: ' + id + '\nType: ' + type);
        FirstFit(type);
    }
    else if(id == 'nextfit'){
        alert('Algo: ' + id + '\nType: ' + type);
        NextFit(type);
    }
    else if(id == 'bestfit'){
        alert('Algo: ' + id + '\nType: ' + type);
        BestFit(type);
    }
    else if(id == 'worstfit'){
        alert('Algo: ' + id + '\nType: ' + type);
        WorstFit(type);
    }
}

function CheckRamPartitionSize(id) {

    partitions = document.getElementById('partitions').value;
    ram_size = document.getElementById('ram-size').innerHTML;
    total_partition_size = 0;

    // Calculating total partition size
    for(i = 0; i < partitions; i++){
        size = document.getElementById('partition-' + (i + 1)).value;
        size = Number(size);
        total_partition_size += size;
    }

    // Checking total partition size and ram size equality
    if(total_partition_size != ram_size) {
        alert('Total partition size must be equal to RAM size!');
    }
    else {
        CheckAlgo(id, 'static');
    }

}

function CheckType(id) {

    static = document.getElementById('static').checked;

    // Checking type (static/dynamic)
    if(static == true) {
        // alert('static true!');
        CheckRamPartitionSize(id);
    }
    else if (static == false) {
        // alert('dynamic true!');
        CheckAlgo(id, 'dynamic');
    }
}

    












// COMMENTED EXTRA CODE

    // const techniqueName = document.getElementById(id).id;
    // output.style.textAlign = "right";
    // alert(output.style.backgroundColor);
    // document.getElementsByClassName('output').innerHTML = 'asdsdasd';



